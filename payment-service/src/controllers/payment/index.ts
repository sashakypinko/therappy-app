import { Controller } from "@nestjs/common";

import { EControllers } from "enums";
import { PaymentService } from "services";

@Controller(EControllers.PAYMENTS)

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
}
