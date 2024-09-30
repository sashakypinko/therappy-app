import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";
import { Appointment } from "entities";

@Entity({ name: EEntities.APPOINTMENT_REVIEW })

export class AppointmentReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  appointment_id: number;

  @Column({ type: "int" })
  target_id: number;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "text", nullable: true })
  comment: string;

  @Column({ type: "int" })
  rating: number;

  @ManyToOne(() => Appointment, (appointment) => appointment.review)
  appointment: Appointment;
}
