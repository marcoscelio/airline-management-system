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
import { MealService } from "./MealService";
import { Weather } from "./Weather";

@ObjectType()
@Entity()
export class Flight {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  flightNumber: string;

  @Field((type) => [MealService], { nullable: true })
  @OneToOne(() => MealService)
  @JoinColumn()
  mealService: MealService;

  @Field((type) => [Airport], { nullable: true })
  @OneToOne(() => Airport)
  @JoinColumn()
  destination: Airport;

  @Field((type) => [Airport], { nullable: true })
  @OneToOne(() => Airport)
  @JoinColumn()
  origin: Airport;

  @Field((type) => [Weather], { nullable: true })
  @OneToOne(() => Weather)
  @JoinColumn()
  weather: Weather;

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Field()
  @DeleteDateColumn()
  deletedAt?: Date;
}
