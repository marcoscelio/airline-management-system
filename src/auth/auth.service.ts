import { Injectable } from "@nestjs/common";
import bcrypt = require("bcrypt");
import { JwtService } from "@nestjs/jwt";
import { User } from "../models/User";
import { UsersService } from "../users/users.service";
import { LoginDto } from "../users/dtos/usersDto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(login: LoginDto): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(login.email);
      if (user) {
        const match = await bcrypt.compareSync(login.password, user.password);
        if (user && match) {
          return user;
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      throw new Error(`Invalid credentials ${error}`);
    }
  }

  async login(login: LoginDto) {
    try {
      const user = await this.validateUser(login);
      console.log(user);
      if (!user) {
        return null;
      }
      const access_token = this.jwtService.sign({
        email: login.email,
        sub: { password: login.password },
      });
      // const test = this.jwtService.verify(access_token);
      // console.log(test)
      return {
        access_token,
      };
    } catch (error) {
      console.log(error);
      throw new Error(`Invalid credentials ${error}`);
    }
  }
}
