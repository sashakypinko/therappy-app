import {
  Entity,
  Column,
  PrimaryGeneratedColumn, OneToMany,
} from "typeorm";

import { EEntities, EPaymentStatus } from "enums";
import {Appointment} from "../appointment";

@Entity({ name: EEntities.PAYMENTS })

export class Payment {
  @PrimaryGeneratedColumn() id: number

  @Column() amount: number
  @Column() user_id: number
  @Column() status: EPaymentStatus

  @OneToMany(() => Appointment, (appointment) => appointment.payment)
  appointments: Appointment[];

  @Column({ nullable: true })
  transaction_id: number | null

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date
}

export * from "./index.dto";
