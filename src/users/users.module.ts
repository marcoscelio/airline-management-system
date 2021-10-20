import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { User } from "../models/User";
import { UsersResolver } from "./resolvers/UsersResolver";
import { AuthService } from "../auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../auth/constants";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [UsersService, UsersResolver, AuthService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
