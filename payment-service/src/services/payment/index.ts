import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Payment } from "entities";

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async findAll():
    Promise<Payment[]> {
    return this.paymentRepository.find();
  }

  async create(paymentData: Payment): Promise<Payment> {
    const newPayment = this.paymentRepository.create(paymentData);
    return this.paymentRepository.save(newPayment);
  }

  async findOne(id: number): Promise<Payment | null> {
    return this.paymentRepository.findOneBy({ id });
  }

  async update(id: number, paymentData: Payment): Promise<Payment | null> {
    await this.paymentRepository.update(id, paymentData);
    return this.paymentRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.paymentRepository.delete(id);
  }
}
