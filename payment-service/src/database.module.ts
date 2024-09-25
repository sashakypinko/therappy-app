import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import {
  User,
  Payment,
  Service,
  Appointment,
  UserBankDetails
} from "entities";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env" }),

    TypeOrmModule.forRootAsync({
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: async (configService: ConfigService) => ({
        type: "mysql",
        synchronize: false,

        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        database: configService.get<string>("DB_NAME"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),

        entities: [
          User,
          Payment,
          Service,
          Appointment,
          UserBankDetails
        ],
      }),
    }),
    TypeOrmModule.forFeature([
      User,
      Service,
      Payment,
      Appointment,
      UserBankDetails
    ]),
  ],
  exports: [ TypeOrmModule ],
})

export class DatabaseModule {}
