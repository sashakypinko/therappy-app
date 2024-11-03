import React from "react";

import { useMedipass } from "hooks";
import { EmptyFunction } from "common/constants";

import {
  EPaymentMethod,
  IErrorTransaction,
  ISuccessTransaction
} from "hooks/medipass/interfaces";

import * as Styled from "./styled";

interface IPayment {
  token: string
  amount: string
  paymentId: number
}

export interface IMedipassPayment {
  paymentData: IPayment
  onError(response: IErrorTransaction): void
  onSuccess(response: ISuccessTransaction): void

  onCancel?(): void
  onCloseModal?(): void
}

export const MedipassPayment = ({
  onError,
  onSuccess,
  paymentData,
  onCancel = EmptyFunction,
  onCloseModal = EmptyFunction,
}: IMedipassPayment) => {
  useMedipass({
    token: paymentData.token,
    transaction: {
      invoiceReference: "1",
      providerNumber: "2429581T",
      chargeAmount: paymentData.amount,
      paymentMethod: EPaymentMethod.NEW_PAYMENT_CARD
    },
    onError,
    onCancel,
    onSuccess,
    onCloseModal
  });

  return (
    <Styled.Container>
      <Styled.MedipassContainer id="medipass-partner-sdk--create-transaction-root" />
    </Styled.Container>
  );
};
