import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";

@Entity({ name: EEntities.PAYMENTS })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transactionId: number;
}
