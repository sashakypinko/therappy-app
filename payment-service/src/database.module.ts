import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { Media } from "entities/media";
import { Payment } from "entities/payment";
import { Service, ServiceCategory } from "entities/service";

import {
  Appointment,
  AppointmentCancel,
  AppointmentReview,
  AppointmentInterval
} from "entities/appointment";

import {
  User,
  UserDetails,
  UserSchedule,
  UserAdditional,
  UserBankDetails,
  UserScheduleOverrides,
} from "entities/user";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),

    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<"mysql">("DB"),
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        database: configService.get<string>("DB_NAME"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        synchronize: configService.get<boolean>("SYNCHRONIZE"),

        entities: [
          Media,
          Payment,
          Service,
          ServiceCategory,

          Appointment,
          AppointmentCancel,
          AppointmentReview,
          AppointmentInterval,

          User,
          UserDetails,
          UserSchedule,
          UserAdditional,
          UserBankDetails,
          UserScheduleOverrides,
        ],
      }),
    }),
    TypeOrmModule.forFeature([
      Media,
      Payment,
      Service,
      ServiceCategory,

      Appointment,
      AppointmentCancel,
      AppointmentReview,
      AppointmentInterval,

      User,
      UserDetails,
      UserSchedule,
      UserAdditional,
      UserBankDetails,
      UserScheduleOverrides,
    ]),
  ],
  exports: [ TypeOrmModule ],
})

export class DatabaseModule {}
