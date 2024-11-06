import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";

import * as queries from "./queries";

@Injectable()
export class AppointmentsService {
  constructor(private appointmentManager: EntityManager) {}

  async moveToPending(ids: Array<number>) {
    await this.appointmentManager.query(queries.UPDATE_STATUS_TO_PENDING, [ids]);
  }

  async collectAmount(ids: Array<number>): Promise<number> {
    const result = await this.appointmentManager.query(queries.FIND_BY_IDS, [ids]);

    if (!result[0]) return 0;

    return result[0].total;
  }
}
