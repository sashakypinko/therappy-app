import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";
import { Appointment } from "entities";

@Entity({ name: EEntities.APPOINTMENTS_CANCELS })

export class AppointmentCancel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  appointment_id: number;

  @Column({ type: "int" })
  therapist_id: number;

  @Column({ type: "text", nullable: true })
  comment: string;

  @ManyToOne(() => Appointment, (appointment) => appointment.cancels)
  appointment: Appointment;
}
