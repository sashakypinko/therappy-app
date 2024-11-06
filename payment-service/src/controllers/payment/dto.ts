import { BasePaymentDto } from "entities";
import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";

export class CancelPaymentPayloadDto {
  @IsNumber() payment_id: number
}

export class CompletedPaymentPayloadDto {
  @IsNumber() payment_id: number
  @IsString() transaction_id: string
}

export class CreatePaymentPayloadDto extends PickType(BasePaymentDto, ["user_id", "appointment_ids"] as const) {}


