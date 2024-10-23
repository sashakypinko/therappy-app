export interface ICreatePaymentData {
  token: string
  paymentId: number
  amount: string
}

export interface ICreatePaymentRequestDTO {
  user_id: number
  appointment_ids: Array<number>
}

export interface ICreatePaymentResponseDTO {
  data: ICreatePaymentData
}
