import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities, EPaymentStatus } from "enums";

@Entity({ name: EEntities.PAYMENTS })

export class Payment {
  @PrimaryGeneratedColumn() id: number

  @Column() amount: number
  @Column() user_id: string
  @Column() status: EPaymentStatus
  @Column() appointment_id: string

  @Column({ nullable: true })
  transaction_id: string | null

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date
}

export * from "./index.dto";
