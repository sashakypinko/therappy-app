import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  Media,
  UserDetails,
  Appointment,
  UserSchedule,
  UserAdditional,
  UserBankDetails,
  AppointmentCancel,
  AppointmentReview,
  UserScheduleOverrides,
} from "entities";

import { EEntities } from "enums";

@Entity({ name: EEntities.USERS })

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: false })
  first_name: string;

  @Column({ type: "varchar", nullable: false })
  last_name: string;

  @Column({ type: "tinyint", default: 0 })
  status: number;

  @Column({ type: "varchar", unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "tinyint", nullable: false })
  type: number;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];

  @OneToMany(() => UserDetails, (details) => details.user)
  details: UserDetails;

  @OneToMany(() => UserBankDetails, (bankDetails) => bankDetails.user)
  bank_details: UserBankDetails;

  @OneToMany(() => UserSchedule, (schedule) => schedule.user)
  schedule: UserSchedule[];

  @OneToMany(() => UserScheduleOverrides, (override) => override.user)
  schedule_overrides: UserScheduleOverrides[];

  @OneToMany(() => Media, (attachment) => attachment.user)
  attachments: Media[];

  @OneToMany(() => UserAdditional, (additional) => additional.user)
  additionals: UserAdditional[];

  isAdmin(): boolean {
    return this.type === 1;
  }

  isTherapist(): boolean {
    return this.type === 2;
  }

  isCustomer(): boolean {
    return this.type === 3;
  }
}
