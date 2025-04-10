import * as dotenv from "dotenv";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

(async () => {
  dotenv.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(3000);
})();
