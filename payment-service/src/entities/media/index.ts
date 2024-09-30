import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { IsString, IsNumber } from "class-validator";

import { EEntities } from "enums";
import { User, UserDetails } from "entities";

@Entity({ name: EEntities.MEDIAS })

export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  @IsString()
  extension: string;

  @Column({ type: "varchar", length: 100 })
  @IsString()
  mime_type: string;

  @Column({ type: "int" })
  @IsNumber()
  size: number;

  @Column({ type: "int" })
  @IsNumber()
  type: number;

  @Column({ type: "varchar", length: 255 })
  @IsString()
  name: string;

  @Column({ type: "int", nullable: true })
  @IsNumber()
  user_id: number;

  @ManyToOne(() => User, (user) => user.attachments)
  user: User;

  @ManyToOne(() => UserDetails, (userDetails) => userDetails.media)
  userDetails: UserDetails;
}
