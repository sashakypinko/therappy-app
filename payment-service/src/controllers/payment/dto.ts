import { BasePaymentDto } from "entities";
import { PickType } from "@nestjs/mapped-types";

export class UpdatePaymentPayloadDto extends PickType(BasePaymentDto, ["status", "transaction_id"] as const) {}

export class CreatePaymentPayloadDto extends PickType(BasePaymentDto, ["user_id", "appointment_ids"] as const) {}
