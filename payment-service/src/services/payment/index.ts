import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import {
  Payment,
  BasePaymentDto,
  UpdatePaymentDto,
} from "entities";

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

  async get(paymentId: number): Promise<Payment> {
    return await this.paymentRepository.findOne({
      where: { id: paymentId }
    });
  }

  async create(createPaymentDto: BasePaymentDto): Promise<Payment> {
    const {
      status,
      amount,
      user_id,
      transaction_id,
      transaction_external_id,
      appointment_ids,
    } = createPaymentDto;

    const newPayment = this.paymentRepository.create({
      amount,
      status,
      user_id,
      transaction_id,
      transaction_external_id,
      appointment_ids,
    });

    return await this.paymentRepository.save(newPayment);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentRepository.update(id, updatePaymentDto);
  }

  async delete(id: number) {
    return await this.paymentRepository.delete({ id });
  }
}
