import { CreateWeatherForcastDto } from "./dtos/weatherDto";
import { Weather } from "../models/Weather";
import { InjectRepository } from "@nestjs/typeorm";
import { WeatherRepository } from "./weather.repository";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Airport } from "../models/Airport";
import { Flight } from "../models/Flight";

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(Weather)
    private weatherRepository: WeatherRepository
  ) {}

  async findById(id: string): Promise<Weather | undefined> {
    // return await this.usersRepository.findOne({ where: { email }, relations: ["addresses"] });
    return await this.weatherRepository.findOne({ where: { id } });
  }

  async create(createWeatherDto: CreateWeatherForcastDto): Promise<Weather> {
    const { status, airport: airportId, flight: flightId } = createWeatherDto;
    try {
      const weather = {
        status,
        airport: { id: airportId } as Airport,
        flight: { id: flightId } as Flight,
      } as Weather;
      await this.weatherRepository.save(weather);
      return weather;
    } catch (error) {
      console.log(error);
      if (error.code.toString() === "23505") {
        throw new ConflictException("Endereço de email já está em uso");
      } else {
        throw new InternalServerErrorException(
          "Erro ao salvar o usuário no banco de dados"
        );
      }
    }
  }
}
