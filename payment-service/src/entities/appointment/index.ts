import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";

@Entity({ name: EEntities.APPOINTMENTS })

export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() date: Date;
  @Column() end: string;
  @Column() start: string;
  @Column() price: number;
  @Column() status: number;
  @Column() user_id: number;
  @Column() duration: number;
  @Column() service_id: number;
  @Column() therapist_id: number;
  @Column({ nullable: true }) phone: string;
  @Column({ nullable: true }) details: string;
  @Column({ nullable: true }) address: string;
  @Column({ nullable: true }) latitude: number;
  @Column({ nullable: true }) longitude: number;
  @Column({ nullable: true }) description: string;
  @Column({ nullable: true }) address_description: string;
  @Column({ nullable: true }) preferred_therapist_id: number;
}
