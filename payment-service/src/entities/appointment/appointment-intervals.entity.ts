import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";
import { Appointment } from "entities";

@Entity({ name: EEntities.APPOINTMENT_INTERVALS })

export class AppointmentInterval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  appointment_id: number;

  @Column({ type: "timestamp" })
  start: Date;

  @Column({ type: "timestamp" })
  end: Date;

  @ManyToOne(() => Appointment, (appointment) => appointment.intervals)
  appointment: Appointment;
}
