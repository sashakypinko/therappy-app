import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "entities";
import { EEntities, EUserRelations } from "enums";

@Entity({ name: EEntities.USER_BANK_DETAILS })

export class UserBankDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() bsb: string;
  @Column() name: string;
  @Column() user_id: number;
  @Column() bank_name: string;
  @Column() account_number: string;

  @OneToOne(() => User, (user) => user.bank_details)
  @JoinColumn({ name: EUserRelations.USER_ID })
  user: User;
}
