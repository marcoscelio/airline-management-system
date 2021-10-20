import { IsNotEmpty } from "class-validator";

export class CreateAirportDto {
  id: number;
  @IsNotEmpty()
  name: string;
}

export class GetAirportDto {
  @IsNotEmpty()
  name: string;
}
