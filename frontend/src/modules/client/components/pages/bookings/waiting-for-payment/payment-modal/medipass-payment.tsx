import React from "react";

import * as Styled from "./styled";
import { useMedipass } from "hooks";
import { EPaymentMethod } from "hooks/medipass/interfaces";

export interface IMedipassPayment {
  paymentData: {
    token: string
    paymentId: number
    amount: string
  }
}

export const MedipassPayment = ({ paymentData }: IMedipassPayment) => {
  const handleError = () => { /**/ };
  const handleCancel = () => { /**/ };
  const handleSuccess = () => { /**/ };
  const handleCloseModal = () => { /**/ };

  useMedipass({
    token: paymentData.token,
    transaction: {
      chargeAmount: paymentData.amount,
      invoiceReference: "1",
      providerNumber: "2429581T",
      paymentMethod: EPaymentMethod.NEW_PAYMENT_CARD
    },

    onError: handleError,
    onCancel: handleCancel,
    onSuccess: handleSuccess,
    onCloseModal: handleCloseModal
  });

  return (
    <Styled.Container>
      <Styled.MedipassContainer id="medipass-partner-sdk--create-transaction-root" />
    </Styled.Container>
  );
};
