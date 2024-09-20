export default interface CreatePaymentResponseDto {
  status: boolean;
  client_secret: string;
  order_id: number;
}
