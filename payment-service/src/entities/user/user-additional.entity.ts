import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "entities";
import { EEntities } from "enums";

@Entity({ name: EEntities.USER_ADDITIONAL })

export class UserAdditional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  additional_id: number;

  @Column({ type: "int", nullable: false })
  media_id: number;

  @Column({ type: "int", nullable: false })
  user_id: number;

  @Column({ type: "boolean", default: false })
  checked: boolean;

  @ManyToOne(() => User, (user) => user.additionals)
  user: User;
}
