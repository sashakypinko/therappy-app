import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";
import { Service } from "entities";

@Entity({ name: EEntities.SERVICES_CATEGORIES })

export class ServiceCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar", nullable: true })
  image: string | null;

  @OneToMany(() => Service, (service) => service.category)
  services: Service[];
}
