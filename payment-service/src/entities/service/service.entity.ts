import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";
import { Appointment, ServiceCategory } from "entities";

@Entity({ name: EEntities.SERVICES })

export class Service {
  static readonly TYPE_INITIAL = 1;
  static readonly TYPE_FOLLOW_UP = 2;

  static readonly TYPES = {
    [Service.TYPE_INITIAL]: { price: 199, duration: 60, name: "Initial Consultation", description: "Initial Consultation" },
    [Service.TYPE_FOLLOW_UP]: { price: 129, duration: 45, name: "Follow-Up", description: "Follow-Up" },
  };

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "int" })
  category_id: number;

  @Column({ type: "int", nullable: true })
  image_id: number | null;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "int", nullable: true })
  status: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "int" })
  duration: number;

  @ManyToOne(() => ServiceCategory, (category) => category.services)
  category: ServiceCategory;

  @OneToMany(() => Appointment, (appointment) => appointment.service)
  appointments: Appointment[];

  get types() {
    return Service.TYPES;
  }
}
