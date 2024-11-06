import { PickType } from "@nestjs/mapped-types";

import {
  IsEnum,
  IsNumber,
  IsOptional, IsString,
} from "class-validator";

import { EPaymentStatus } from "enums";

export class BasePaymentDto {
  @IsNumber() amount: number
  @IsNumber() user_id: number
  @IsNumber() appointment_ids: Array<number>
  @IsEnum(EPaymentStatus) status: EPaymentStatus

  @IsOptional()
  @IsNumber() therapist_id: number | null

  @IsOptional()
  @IsString() transaction_id: string | null
}

export class UpdatePaymentDto extends PickType(BasePaymentDto, ["status", "transaction_id"] as const) {}
