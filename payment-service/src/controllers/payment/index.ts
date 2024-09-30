import {
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from "@nestjs/common";

import { ApiResponse } from "utils";
import { TyroHealth } from "integrations";
import { EControllers, EPaymentStatus } from "enums";
import { PaymentService, AppointmentsService } from "services";

import * as DTO from "./dto";
import * as Routes from "./routes";

@Controller(EControllers.PAYMENTS)

export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly appointmentService: AppointmentsService
  ) {}

  TyroAPI = new TyroHealth();

  @Post(Routes.CREATE_PAYMENT)
  async createPayment(@Body() createPaymentDto: DTO.CreatePaymentPayloadDto) {
    try {
      const {
        user_id,
        appointment_ids
      } = createPaymentDto;

      const { token } = await this.TyroAPI.generateAuthToken();
      const amount = await this.appointmentService.collectAmount(appointment_ids)

      const { id } = await this.paymentService.create({
        amount,
        user_id,
        appointment_ids,
        therapist_id: null,
        transaction_id: null,
        status: EPaymentStatus.PENDING
      });

      return ApiResponse.success("Payment created successfully", {
        token,
        amount,
        paymentId: id
      });
    } catch (error) {
      return ApiResponse.error("Failed to create payment", error);
    }
  };

  @Post(Routes.CANCEL_PAYMENT)
  async cancelPayment() {

  }

  @Post(Routes.COMPLETE_PAYMENT)
  async completePayment() {

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
