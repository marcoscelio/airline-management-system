import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { getConnection } from "typeorm";
import { AppModule } from "./app.module";
import { User, UserStatus } from "./models/User";
import bcrypt = require("bcrypt");
import fs = require("fs");

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync("./certs/server.key"),
  //   cert: fs.readFileSync("./certs/server.cert"),
  // };
  // const app = await NestFactory.create(AppModule, { httpsOptions });
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.APP_PORT || 3000;
  const repo = await getConnection().getRepository(User);
  const found = await repo.findOne({ name: "Admin" });
  if (!found) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const user = {
      name: "Admin",
      password: await bcrypt.hashSync("admin123", salt),
      email: "jonh@gmail.com",
      phone: "89247128974",
      gender: "M",
      cpf: "65487643220",
      address: "Woodville grange 2 Street",
      zipcode: "127318264",
      city: "Athlone",
      state: "WM",
      status: UserStatus.ACTIVE,
      preferences: "Coffee",
    };
    repo.insert(user);
  }
  console.log(`Listening to post ${port}`)
  await app.listen(port);
}
bootstrap();
