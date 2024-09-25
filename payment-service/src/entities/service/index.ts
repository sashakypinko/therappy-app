import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";

@Entity({ name: EEntities.SERVICES })
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column() name: string;
  @Column() price: number;
  @Column() status: number;
  @Column() duration: number;
  @Column() image_id: number;
  @Column() category_id: number;
  @Column() description: string;
}
