import * as process from "process";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  logging: true,
  synchronize: false,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  type: process.env.DB as "mysql",
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
});
