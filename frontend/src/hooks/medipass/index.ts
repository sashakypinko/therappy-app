import { useEffect } from "react";
import isFunction from "lodash/isFunction";
import medipassSDK from "@medipass/partner-sdk";

import * as Interfaces from "./interfaces";
import { EmptyFunction } from "common/constants";

interface IUseMedipassHook {
  appointmentsIds: number[]
  token: string
  onError: Interfaces.TOnError
  onCancel: Interfaces.TOnCancel
  onSuccess: Interfaces.TSuccess
  transaction: Interfaces.TTransactionAttributes

  onUnmount?: Interfaces.TOnUnmount
  onCloseModal?: Interfaces.TCloseModal
  onTransactionCreated?: Interfaces.TOnTransactionCreated
  onTransactionUpdated?: Interfaces.TOnTransactionUpdated
}

export const useMedipass = ({
  appointmentsIds,
  token,
  onError,
  onCancel,
  onUnmount,
  onSuccess,
  transaction,
  onCloseModal,
  onTransactionUpdated = EmptyFunction,
  onTransactionCreated = EmptyFunction,
}: IUseMedipassHook) => {
  useEffect(() => {
    const existingElement = document.getElementById('medipass-partner-sdk--create-transaction-root');
    if (existingElement) existingElement.innerHTML = '';

    (async () => {
      await medipassSDK.setConfig({
        token,
        env: "stg",
        appVersion: "3",
        appId: "therappy-web",
      });
    })();

    medipassSDK.renderCreateTransaction(
      {
        ...transaction,
        platform: 'virtual-terminal',
        webhooks: [
          {
            url: `${process.env.REACT_APP_PHP_API_URL}/payments/complete-refund?appointments=${appointmentsIds.join(',')}`,
            event: 'invoiceRefunded',
            method: 'POST',
            headers: { sessionKey: process.env.REACT_APP_TYRO_SESSION_KEY },
          },
        ],
      },
      {
        version: '3',
        allowEdit: false,
        disableModifyServiceItems: true,
        onError,
        onCancel,
        onSuccess,
        onCloseModal,
        onTransactionCreated,
        onTransactionUpdated,
      },
    );

    return () => {
      if (isFunction(onUnmount)) onUnmount();
    };
  }, [token, transaction]);
};
