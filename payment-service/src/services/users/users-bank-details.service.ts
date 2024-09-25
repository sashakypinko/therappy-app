import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserBankDetails } from "entities";

@Injectable()
export class UsersBankDetailsService {
  constructor(@InjectRepository(UserBankDetails)
    private paymentRepository: Repository<UserBankDetails>
  ) {}

  async create() {}

  async update() {}

  async remove() {}
}
