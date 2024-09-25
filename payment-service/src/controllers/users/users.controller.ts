import {
  Get,
  Param,
  Controller,
} from "@nestjs/common";

import { EControllers } from "enums";
import { UsersService } from "services";

@Controller(EControllers.USERS)

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":id")
  async getById(@Param("id") id: number) {
    return await this.usersService.getById(id);
  };
}
