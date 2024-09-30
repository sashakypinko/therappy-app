import { In, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import {
  Payment,
  Appointment,
  BasePaymentDto,
  UpdatePaymentDto,
} from "entities";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,

    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  async create(createPaymentDto: BasePaymentDto): Promise<Payment> {
    const {
      status,
      amount,
      user_id,
      transaction_id,
      appointment_ids,
    } = createPaymentDto;

    const appointments = await this.appointmentRepository.find({
      where: { id: In(appointment_ids) }
    });

    const newPayment = this.paymentRepository.create({
      amount,
      status,
      user_id,
      appointments,
      transaction_id,
    });

    const savedPayment = await this.paymentRepository.save(newPayment);

    for (const appointment of appointments) appointment.payment = savedPayment;

    await this.appointmentRepository.save(appointments);

    return savedPayment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentRepository.update(id, updatePaymentDto);
  }

  async delete(id: number) {
    return await this.paymentRepository.delete({ id });
  }
}
