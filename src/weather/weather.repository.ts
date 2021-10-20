import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Weather } from "../models/Weather";

@Injectable()
@EntityRepository(Weather)
export class WeatherRepository extends Repository<Weather> {}
