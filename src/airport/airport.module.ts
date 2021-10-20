import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConstants } from "../auth/constants";
import { Airport } from "../models/Airport";
import { AirportService } from "./airport.service";
import { AirportResolver } from "./resolvers/AirportResolver";

@Module({
  imports: [
    TypeOrmModule.forFeature([Airport]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [AirportService, AirportResolver],
  controllers: [],
  exports: [AirportService],
})
export class AirportModule {}
