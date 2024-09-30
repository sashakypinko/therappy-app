import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { User } from "entities"
import { EEntities } from "enums";

@Entity({ name: EEntities.USER_SCHEDULES })

export class UserSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  user_id: number;

  @Column({ type: "int", nullable: false })
  day: number;

  @Column({ type: "time", nullable: false })
  start: string;

  @Column({ type: "time", nullable: false })
  end: string;

  @ManyToOne(() => User, (user) => user.schedule)
  user: User;
}
