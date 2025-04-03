import React from "react";

import { useMedipass } from "hooks";
import { EmptyFunction } from "common/constants";

import {
  EPaymentMethod,
  IErrorTransaction,
  ISuccessTransaction
} from "hooks/medipass/interfaces";

import { IUser } from "services/api/user/dto/user.dto";

import * as Styled from "./styled";

interface IPayment {
  token: string
  amount: string
  paymentId: number
}

export interface IMedipassPayment {
  user: IUser
  paymentData: IPayment
  appointmentsIds: number[]
  onError(response: IErrorTransaction): void
  onSuccess(response: ISuccessTransaction): void

  onCancel?(): void
  onCloseModal?(): void
}

export const MedipassPayment = ({
  user,
  appointmentsIds,
  onError,
  onSuccess,
  paymentData,
  onCancel = EmptyFunction,
  onCloseModal = EmptyFunction,
}: IMedipassPayment) => {
  useMedipass({
    appointmentsIds,
    token: paymentData.token,
    transaction: {
      invoiceReference: "1",
      chargeAmount: paymentData.amount,
      patient: {
        refId: user.id.toString(),
        lastName: user.last_name,
        firstName: user.first_name,
      },
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
