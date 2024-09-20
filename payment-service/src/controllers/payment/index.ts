import { Controller } from "@nestjs/common";

import { PaymentService } from "services";

@Controller()
export class PaymentController {
  constructor(private readonly appService: PaymentService) {}
}
