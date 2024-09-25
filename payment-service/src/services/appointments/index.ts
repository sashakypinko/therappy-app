import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Appointment } from "entities";

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(Appointment)
    private paymentRepository: Repository<Appointment>
  ) {}

  async create() {}

  async update() {}

  async remove() {}
}
