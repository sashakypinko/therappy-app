import { EntityManager } from "typeorm";
import {Injectable, Logger} from '@nestjs/common';

import * as queries from "./queries";

@Injectable()
export class AppointmentsService {
  constructor(private appointmentManager: EntityManager) {}

  async moveToPending(externalId: string | null, ids: Array<number>) {
    Logger.log(externalId)
    await this.appointmentManager.query(queries.UPDATE_STATUS_TO_PENDING, [externalId, ids]);
  }

  async collectAmount(ids: Array<number>): Promise<number> {
    const result = await this.appointmentManager.query(queries.FIND_BY_IDS, [ids]);

    if (!result[0]) return 0;

    return result[0].total;
  }
}
