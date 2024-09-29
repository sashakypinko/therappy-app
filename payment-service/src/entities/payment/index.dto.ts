import { Type } from "class-transformer";
import { PickType } from "@nestjs/mapped-types";

import {
  IsEnum,
  IsDate,
  IsNumber,
  IsString,
  IsOptional,
} from "class-validator";

import { EPaymentStatus } from "enums";

export class BasePaymentDto {
  @IsNumber() amount: number
  @IsString() user_id: string
  @IsString() therapist_id: string
  @IsString() appointment_id: string
  @IsEnum(EPaymentStatus) status: EPaymentStatus

  @IsDate()
  @Type(() => Date) created_at: Date

  @IsDate()
  @Type(() => Date) updated_at: Date

  @IsOptional()
  @IsString() transaction_id: string | null
}

export class UpdatePaymentDto extends PickType(BasePaymentDto, ["status", "transaction_id"] as const) {}
