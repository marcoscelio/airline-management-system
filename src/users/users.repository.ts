import { EntityRepository, Repository } from "typeorm";
import {
    Injectable
} from "@nestjs/common";
import { User } from "../models/User";

@Injectable()
@EntityRepository(User)
export class UsersRepository extends Repository<User> {
}
