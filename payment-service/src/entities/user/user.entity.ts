import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";

@Entity({ name: EEntities.USERS })

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() type: number;
  @Column() email: string;
  @Column() status: number;
  @Column() password: string;
  @Column() last_name: string;
  @Column() first_name: string;

  static TYPE_ADMIN = 1;
  static TYPE_CLIENT = 3;
  static TYPE_THERAPIST = 2;

  static STATUS_NEW = 0;
  static STATUS_ACTIVE = 3;
  static STATUS_PENDING = 1;
  static STATUS_DELETED = 5;
  static STATUS_APPROVED = 2;
  static STATUS_DECLINED = 4;
}
