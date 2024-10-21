import React from "react";

import * as Styled from "./styled";
import { useMedipass } from "hooks";

/* THIS JUST EXAMPLE - ITS DOESN'T WORK  */
export const TEST_TRANSACTION = {
  funder: "medicare",
  providerNumber: "2409661B",
  funderData: {
    medicare: {
      isBulkBilled: false,
      lspn: "01",
      isInHospital: false,
      referral: {
        referrerType: "gp",
        providerNumber: "2054781W",
        providerName: "Dr. Jane Smith",
        issueDateString: "2020-07-23",
        period: "standard"
      }
    }
  },
  invoiceReference: "INV12350",
  patient: {
    firstName: "FELICA",
    lastName: "HENDRIX",
    dob: "1975-04-14",
    mobile: "0411111111",
    accountNumber: "6950507392",
    reference: "1"
  },
  claimableItems: [
    {
      itemCode: "23",
      serviceDateString: "2022-02-15",
      price: "$90"
    }
  ],
};

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
    transaction: TEST_TRANSACTION as any,

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
