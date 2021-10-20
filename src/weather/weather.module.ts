import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { jwtConstants } from "../auth/constants";
import { Weather } from "../models/Weather";
import { WeatherResolver } from "./resolvers/WeatherResolver";
import { WeatherRepository } from "./weather.repository";
import { WeatherService } from "./weather.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Weather]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [WeatherService, WeatherResolver],
  controllers: [],
  exports: [WeatherService],
})
export class WeatherModule {}
