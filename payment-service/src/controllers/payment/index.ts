import {
  Post,
  Body,
  Param,
  Delete,
  Controller,
} from "@nestjs/common";

import {
  ApiResponse,
  TyroService,
  PaymentService,
  AppointmentsService
} from "services";

import { EControllers, EPaymentStatus } from "enums";

import * as DTO from "./dto";
import * as Routes from "./routes";

@Controller(EControllers.PAYMENTS)

export class PaymentController {
  constructor(
    private readonly tyroService: TyroService,
    private readonly paymentService: PaymentService,
    private readonly appointmentService: AppointmentsService
  ) {}

  @Post(Routes.CREATE_PAYMENT)
  async createPayment(@Body() createPaymentDto: DTO.CreatePaymentPayloadDto) {
    try {
      const {
        user_id,
        appointment_ids
      } = createPaymentDto;

      const { token } = await this.tyroService.generateAuthToken();
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
  async cancelPayment(@Body() cancelPaymentDto: DTO.CancelPaymentPayloadDto) {
    const { payment_id, } = cancelPaymentDto;

    try {
      await this.paymentService.delete(payment_id);

      return ApiResponse.success("Payment cancel successfully");
    } catch (error) {
      return ApiResponse.error("Failed to cancel payment", error);
    }
  };

  @Post(Routes.COMPLETE_PAYMENT)
  async completedPayment(@Body() cancelPaymentDto: DTO.CompletedPaymentPayloadDto) {
    const {
      payment_id,
      transaction_id
    } = cancelPaymentDto;

    try {
      const payment = await this.paymentService.get(payment_id)

      await this.appointmentService.moveToPending(payment.appointment_ids);

      await this.paymentService.update(payment_id, {
        transaction_id,
        status: EPaymentStatus.COMPLETED,
      });

      return ApiResponse.success("Payment completed successfully");
    } catch (error) {
      return ApiResponse.error("Failed to complete payment", error);
    }
  };

  @Delete(Routes.DELETE_PAYMENT)
  async deletePayment(@Param("id") id: string) {
    try {
      await this.paymentService.delete(+id);

      return ApiResponse.success("Payment deleted successfully");
    } catch (error) {
      return ApiResponse.error("Failed to delete payment", error);
    }
  };
}
