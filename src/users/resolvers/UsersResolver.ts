import {
  Resolver,
  Args,
  Query,
  ResolveField,
  Parent,
  ObjectType,
  Field,
} from "@nestjs/graphql";
import { Inject, UseGuards } from "@nestjs/common";
import { User } from "../../models/User";
import { UsersService } from "../users.service";

import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { LoginDto } from "../dtos/usersDto";
import { AuthService } from "../../auth/auth.service";
import { GqlAuthGuard } from "../../auth/gql-jwt-auth.guard";

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    @Inject(UsersService) private usersServices: UsersService,
    @Inject(AuthService) private authService: AuthService
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User)
  async user(@Args("email") email: string): Promise<User> {
    return await this.usersServices.findByEmail(email);
  }

  @Query((returns) => AuthToken)
  async signin(
    @Args("email") email: string,
    @Args("password") password: string
  ) {
    const result = await this.authService.login({
      email,
      password,
    } as LoginDto);

    return new AuthToken(result?.access_token);
  }
}

@ObjectType()
export class AuthToken {
  constructor(token) {
    this.token = token;
  }
  @Field()
  token: string;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);
