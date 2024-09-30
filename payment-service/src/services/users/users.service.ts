import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(private userManager: EntityManager) {}
}
