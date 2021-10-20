import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { Inject } from "@nestjs/common";
import { User } from "../../models/User";
import { WeatherService } from "../weather.service";
import { Weather } from "../../models/Weather";
import { CreateWeatherForcastDto } from "../dtos/weatherDto";

@Resolver((of) => Weather)
export class WeatherResolver {
  constructor(
    @Inject(WeatherService) private weatherServices: WeatherService
  ) {}

  @Query((returns) => Weather)
  async weather(@Args("id") id: string): Promise<Weather> {
    return await this.weatherServices.findById(id);
  }

  @Mutation((returns) => Weather)
  async putLatestWeatherForcast(
    @Args("status") status: string,
    @Args("airport") airport: string,
    @Args("flight") flight: string
  ) {
    return this.weatherServices.create({
      status,
      airport,
      flight,
    } as CreateWeatherForcastDto);
  }
}
