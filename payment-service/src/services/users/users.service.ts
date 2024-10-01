import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";

import * as queries from "./queries";

@Injectable()
export class UsersService {
  constructor(private userManager: EntityManager) {}

  async getById(userId: number) {
    const userData = await this.userManager.query(queries.BY_ID, [userId]);

    return userData[0] || null;
  }
}
