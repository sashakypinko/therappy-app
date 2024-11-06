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
  @Column() user_id: number
  @Column() status: EPaymentStatus

  @Column({ nullable: true })
  transaction_id: string | null

  @Column("json", { nullable: true })
  appointment_ids: number[];

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at: Date

  @Column({
    type: "timestamp",
    onUpdate: "CURRENT_TIMESTAMP",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date
}

export * from "./index.dto";
