import { In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Appointment } from "entities";

@Injectable()
export class AppointmentsCancelService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async create() {}

  async update() {}

  async remove() {}

  async collectAmount(ids: Array<number>) {
    const appointments = await this.appointmentRepository.find({
      where: { id: In(ids) }
    });

    return appointments.reduce((sum, payment) => sum + payment.price, 0);
  };
}
