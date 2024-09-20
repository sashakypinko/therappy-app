import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Payment } from "entities";

@Injectable()
export class PaymentService {
  constructor(@InjectRepository(Payment)
    private paymentRepository: Repository<Payment>
  ) {}

  async create() {}

  async update() {}

  async remove() {}
}
