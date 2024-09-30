import {
  Entity,
  Column,
  OneToOne,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  User,
  Service,
  Payment,
  AppointmentReview,
  AppointmentCancel,
  AppointmentInterval,
} from "entities";

import { EEntities } from "enums";

@Entity({ name: EEntities.APPOINTMENTS })

export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "int" })
  user_id: number;

  @Column({ type: "int" })
  therapist_id: number;

  @Column({ type: "int" })
  service_id: number;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  start: string;

  @Column({ type: "time" })
  end: string;

  @Column({ type: "int" })
  status: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  latitude: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  longitude: number;

  @Column({ type: "text", nullable: true })
  address: string;

  @Column({ type: "text", nullable: true })
  address_description: string;

  @Column({ type: "text", nullable: true })
  details: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int", nullable: true })
  preferred_therapist_id: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "int" })
  duration: number;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Service, (service) => service.appointments)
  service: Service;

  @OneToMany(() => AppointmentInterval, (interval) => interval.appointment)
  intervals: AppointmentInterval[];

  @OneToOne(() => AppointmentCancel, (cancel) => cancel.appointment)
  cancels: AppointmentCancel;

  @OneToOne(() => AppointmentReview, (review) => review.appointment)
  review: AppointmentReview;

  @ManyToOne(() => Payment, (payment) => payment.appointments)
  payment: Payment;
}
