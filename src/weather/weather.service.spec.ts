import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../models/User";
import { Weather } from "../models/Weather";
import { WeatherRepository } from "./weather.repository";
import { WeatherService } from "./weather.service";

describe("WeatherService", () => {
  let service: WeatherService;
  const mockRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: getRepositoryToken(Weather),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
