import { Field, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Flight } from "./Flight";

@ObjectType()
@Entity()
export class MealService {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column()
  menu: string;

  @Field((type) => [Flight], { nullable: true })
  @OneToOne(() => Flight)
  @JoinColumn()
  flight: Flight;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
