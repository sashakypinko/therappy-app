import {
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from "@nestjs/common";

import { ApiResponse } from "utils";
import { PaymentService } from "services";
import { TyroHealth } from "integrations";
import { EControllers, EPaymentStatus } from "enums";
import { BasePaymentDto, UpdatePaymentDto } from "entities";

import * as Routes from "./routes";

@Controller(EControllers.PAYMENTS)

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  TyroAPI = new TyroHealth();

  @Post(Routes.CREATE_PAYMENT)
  async createPayment(@Body() createPaymentDto: BasePaymentDto) {
    const {
      amount,
      user_id,
      appointment_id
    } = createPaymentDto;

    try {
      const { token } = await this.TyroAPI.generateAuthToken();

      const { id } = await this.paymentService.create({
        amount,
        user_id,
        appointment_id,
        transaction_id: null,
        created_at: new Date(),
        updated_at: new Date(),
        status: EPaymentStatus.PENDING
      });

      return ApiResponse.success("Payment created successfully", {
        token,
        paymentId: id
      });
    } catch (error) {
      return ApiResponse.error("Failed to create payment", error);
    }
  };

  @Post(`${Routes.UPDATE_PAYMENT}/:id`)
  async updatePayment(@Param() id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      await this.paymentService.update(id, updatePaymentDto);

      return ApiResponse.success("Payment updated successfully");
    } catch (error) {
      return ApiResponse.error("Failed to update payment", error);
    }
  }

  @Delete(`${Routes.DELETE_PAYMENT}/:id`)
  async deletePayment(@Param("id") id: string) {
    await this.paymentService.delete(+id);

    try {
      return ApiResponse.success("Payment deleted successfully");
    } catch (error) {
      return ApiResponse.error("Failed to delete payment", error);
    }
  };
}
