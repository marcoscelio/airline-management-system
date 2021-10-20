import { CreateAirportDto } from "./dtos/airportDto";
import { InjectRepository } from "@nestjs/typeorm";
import { AirportRepository } from "./airport.repository";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { Airport } from "../models/Airport";

@Injectable()
export class AirportService {
  constructor(
    @InjectRepository(Airport)
    private airportRepository: AirportRepository
  ) {}

  async findByName(name: string): Promise<Airport[] | undefined> {
    return await this.airportRepository.find({ where: { name } });
  }

  async create(createWeatherDto: CreateAirportDto): Promise<Airport> {
    const { name } = createWeatherDto;
    try {
      return this.airportRepository.save({ name } as Airport);
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
