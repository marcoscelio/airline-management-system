import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { AirportService } from "../airport.service";
import { CreateAirportDto } from "../dtos/airportDto";
import { Airport } from "../../models/Airport";

@Resolver((of) => Airport)
export class AirportResolver {
  constructor(
    @Inject(AirportService) private airportServices: AirportService
  ) {}

  @Query((returns) => [Airport])
  async listAirports(@Args("name") name: string): Promise<Airport[]> {
    return this.airportServices.findByName(name);
  }

  @Mutation((returns) => Airport)
  async createAirport(@Args("name") name: string) {
    return this.airportServices.create({
      name,
    } as CreateAirportDto);
  }
}
