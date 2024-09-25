import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";

@Entity({ name: EEntities.USER_BANK_DETAILS })

export class UserBankDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() bsb: string;
  @Column() name: string;
  @Column() user_id: number;
  @Column() bank_name: string;
  @Column() account_number: string;
}
