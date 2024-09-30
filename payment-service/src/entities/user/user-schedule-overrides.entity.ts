import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "entities"
import { EEntities } from "enums";

@Entity({ name: EEntities.USER_SCHEDULE_OVERRIDES })

export class UserScheduleOverrides {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  user_id: number;

  @Column({ type: "date", nullable: false })
  date: string;

  @Column({ type: "time", nullable: false })
  start: string;

  @Column({ type: "time", nullable: false })
  end: string;

  @ManyToOne(() => User, (user) => user.schedule_overrides)
  user: User;
}
