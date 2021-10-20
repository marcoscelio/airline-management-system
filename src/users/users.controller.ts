import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/gql-jwt-auth.guard";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { LocalAuthGuard } from "../auth/local-auth.guard";
import { CreateUserDto, UserEmailDto } from "./dtos/usersDto";
import { UsersService } from "./users.service";

@Controller("v1")
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Post("users")
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersServices.create(createUserDto);
  }

  @Get("users")
  async find(@Body() userEmail: UserEmailDto) {
    return this.usersServices.findByEmail(userEmail.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get("users")
  findOrCreate(): string {
    return "hello nestjs";
  }
}
