import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "entities";
import { EUserRelations } from "enums";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [EUserRelations.BANK_DETAILS],
    });
  };

  async update(id: number, data: Partial<User>): Promise<User> {
    const user = await this.getById(id);

    Object.assign(user, data);

    return this.userRepository.save(user);
  };
}
