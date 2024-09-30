import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { EEntities } from "enums";
import { User, Media } from "entities";

@Entity({ name: EEntities.USER_DETAILS })

export class UserDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: false })
  user_id: number;

  @Column({ type: "varchar", nullable: true })
  phone: string;

  @Column({ type: "int", default: 0 })
  gender: number;

  @Column({ type: "int", default: 0 })
  preferred_gender: number;

  @Column({ type: "decimal", nullable: true })
  latitude: number;

  @Column({ type: "decimal", nullable: true })
  longitude: number;

  @Column({ type: "int", nullable: true })
  radius: number;

  @Column({ type: "varchar", nullable: true })
  address: string;

  @Column({ type: "varchar", nullable: true })
  address_description: string;

  @Column({ type: "int", nullable: true })
  image_id: number;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "varchar", nullable: true })
  visa: string;

  @Column({ type: "varchar", nullable: true })
  abn: string;

  @Column({ type: "varchar", nullable: true })
  ahrpa_number: string;

  @Column({ type: "varchar", nullable: true })
  remedial_number: string;

  @Column({ type: "text", nullable: true })
  contacts: string;

  @ManyToOne(() => User, (user) => user.details)
  user: User;

  @OneToMany(() => Media, (media) => media.userDetails)
  attachments: Media[];

  @OneToMany(() => Media, (media) => media.userDetails)
  media: Media[];

  get contactsArray(): any[] {
    return this.contacts ? JSON.parse(this.contacts) : [];
  }

  set contactsArray(value: any[]) {
    this.contacts = value ? JSON.stringify(value) : "";
  }
}
