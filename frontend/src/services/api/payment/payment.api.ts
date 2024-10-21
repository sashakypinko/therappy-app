import ApiService from "../api-service";

import * as DTO from "./dto";

class PaymentService extends ApiService {
  constructor(pathPrefix: string, baseURL?: string) {
    super(pathPrefix, baseURL);
  }

  createPayment = async (data: DTO.ICreatePaymentRequestDTO): Promise<DTO.ICreatePaymentResponseDTO> => {
    return await this.postAsUsually("/create-payment", data).then((res) => res.data);
  };
}

export const PaymentApi = new PaymentService("payments", process.env.REACT_APP_NODE_API_URL);
