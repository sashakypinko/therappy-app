import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import {
  Payment,
  BasePaymentDto,
  UpdatePaymentDto
} from "entities";

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async create(createPaymentDto: BasePaymentDto): Promise<Payment> {
    const newPayment = this.paymentRepository.create(createPaymentDto);

    return await this.paymentRepository.save(newPayment);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentRepository.update(id, updatePaymentDto);
  }

  async delete(id: number) {
    return await this.paymentRepository.delete({ id });
  }
}
