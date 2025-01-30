import * as dotenv from "dotenv";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";
import process from 'process';

(async () => {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.APP_PORT || 3001);
})();
