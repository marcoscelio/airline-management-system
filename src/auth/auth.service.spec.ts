import { JwtModule, JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../models/User";
import { UsersModule } from "../users/users.module";
import { UsersRepository } from "../users/users.repository";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

describe("AuthService", () => {
  let service: AuthService;

  const mockUserService = {

  };
  const mockJwtService = {

  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUserService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
