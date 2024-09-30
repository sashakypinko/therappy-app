import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersBankDetailsService {
  constructor(private userBankDetailsManager: EntityManager) {}
}
