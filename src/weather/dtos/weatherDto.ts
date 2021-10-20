import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateWeatherForcastDto {
  id: number;
  @IsNotEmpty()
  status: string;
  airport: string;
  flight: string;
}

export class GetWeatherDto {
  @IsNotEmpty()
  id: number;
}
