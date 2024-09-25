import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database.module"

import {
  UsersService,
  PaymentService,
  ServicesService,
  AppointmentsService,
  UsersBankDetailsService,
} from "services";

import {
  UsersController,
  ServiceController,
  PaymentController,
  AppointmentsController,
  UserBankDetailsController,
} from "controllers";

@Module({
  providers: [
    UsersService,
    PaymentService,
    ServicesService,
    AppointmentsService,
    UsersBankDetailsService,
  ],

  controllers: [
    UsersController,
    ServiceController,
    PaymentController,
    AppointmentsController,
    UserBankDetailsController,
  ],

  imports: [ DatabaseModule ],
})

export class AppModule {}
