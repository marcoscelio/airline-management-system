import { EntityRepository, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Airport } from "../models/Airport";

@Injectable()
@EntityRepository(Airport)
export class AirportRepository extends Repository<Airport> {}
