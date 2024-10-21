interface ICreatePaymentData {
  token: string
  payment_id: number
}

export interface ICreatePaymentRequestDTO {
  user_id: number
  appointment_ids: Array<number>
}

export interface ICreatePaymentResponseDTO {
  data: ICreatePaymentData
}
