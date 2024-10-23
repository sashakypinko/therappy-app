import React from "react";

import * as Styled from "./styled";
import { useMedipass } from "hooks";
import { EPaymentMethod } from "hooks/medipass/interfaces";

interface IMedipassPayment {
  token: string
}

export const MedipassPayment = ({ token }: IMedipassPayment) => {
  const handleError = () => { /**/ };
  const handleCancel = () => { /**/ };
  const handleSuccess = () => { /**/ };
  const handleCloseModal = () => { /**/ };

  useMedipass({
    token,
    transaction: {
      chargeAmount: "$100",
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
      <Styled.MedipassContainer id="medipass-transaction-form" />
    </Styled.Container>
  );
};
