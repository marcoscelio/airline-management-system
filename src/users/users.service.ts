import { CreateUserDto } from "./dtos/usersDto";
import { User } from "../models/User";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersRepository } from "./users.repository";
import * as bcrypt from "bcrypt";
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    // return await this.usersRepository.findOne({ where: { email }, relations: ["addresses"] });
    return await this.usersRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const {
      email,
      cpf,
      name,
      password
    } = createUserDto;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const user = this.usersRepository.create();
    user.email = email;
    user.cpf = cpf;
    user.name = name;
    user.password = await bcrypt.hashSync(password, salt);
    try {
      await this.usersRepository.save(user);
      delete user.password;
      return user;
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
