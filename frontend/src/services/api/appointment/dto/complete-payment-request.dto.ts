export default interface CompletePaymentRequestDto {
  items: number[];
  client_secret: string;
  order_id: number;
}
