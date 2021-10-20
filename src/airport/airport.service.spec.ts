import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Airport } from "../models/Airport";
import { AirportService } from "./airport.service";

describe("AirportService", () => {
  let service: AirportService;
  const mockRepo = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirportService,
        {
          provide: getRepositoryToken(Airport),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AirportService>(AirportService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
