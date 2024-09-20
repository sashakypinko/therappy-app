import { Module } from "@nestjs/common";

import { PaymentService } from "services";
import { PaymentController } from "controllers";

@Module({
  imports: [],
  providers: [
    PaymentService
  ],
  controllers: [
    PaymentController
  ],
})

export class AppModule {}
