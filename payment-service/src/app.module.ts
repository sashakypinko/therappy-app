import { Module } from "@nestjs/common";
import { HttpModule } from "./http.module";
import { DatabaseModule } from "./database.module"

import {
  TyroService,
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
    TyroService,
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

  imports: [
    DatabaseModule,
    HttpModule.forFeature({
      serviceName: "TyroHttpService",
      config: {
        enableLogging: true,
        baseURL: "https://stg-api-au.medipass.io",
      },
    }),
  ],
})

export class AppModule {}
