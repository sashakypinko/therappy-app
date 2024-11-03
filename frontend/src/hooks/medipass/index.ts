import { useEffect } from "react";
import isFunction from "lodash/isFunction";
import medipassSDK from "@medipass/partner-sdk";

import * as Interfaces from "./interfaces";
import { EmptyFunction } from "common/constants";

interface IUseMedipassHook {
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
        platform: "virtual-terminal",
      },
      {
        version: "3",
        allowEdit: false,
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
