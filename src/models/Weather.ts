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
import { Airport } from "./Airport";
import { Flight } from "./Flight";

@ObjectType()
@Entity()
export class Weather {
  @PrimaryGeneratedColumn("uuid") id?: string;

  @Field()
  @Column()
  status!: string;

  @Field((type) => [Flight], { nullable: true })
  @OneToOne(() => Flight)
  @JoinColumn()
  flight?: Flight;

  @Field((type) => [Airport], { nullable: true })
  @OneToOne(() => Airport)
  @JoinColumn()
  airport?: Airport;

  @Field()
  @CreateDateColumn()
  createdAt?: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt?: Date;
}
