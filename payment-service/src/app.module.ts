import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module"

import {
  UsersService,
  PaymentService,
  AppointmentsService,
  UsersBankDetailsService,
} from "services";

import {
  UsersController,
  PaymentController,
  AppointmentsController,
  UserBankDetailsController,
} from "controllers";

@Module({
  providers: [
    UsersService,
    PaymentService,
    AppointmentsService,
    UsersBankDetailsService,
  ],

  controllers: [
    UsersController,
    PaymentController,
    AppointmentsController,
    UserBankDetailsController,
  ],

  imports: [ DatabaseModule ],
})

export class AppModule {}
