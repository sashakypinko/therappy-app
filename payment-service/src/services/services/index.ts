import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Service } from "entities";

@Injectable()
export class ServicesService {
  constructor(@InjectRepository(Service)
    private paymentRepository: Repository<Service>
  ) {}

  async create() {}

  async update() {}

  async remove() {}
}
