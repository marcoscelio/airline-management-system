import { HttpStatus } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Req } from '@nestjs/common';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from '../users/dtos/usersDto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }
  

//   @UseGuards(LocalAuthGuard)
//   @Post('auth/login')
//   async login(@Request() req) {
//     return this.authService.login(req.user);
//   }

  @Get()
  getHello(): string {
    return "Hello world";
  }

  @Get("/facebook")
  @UseGuards(AuthGuard("facebook"))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(AuthGuard("facebook"))
  async facebookLoginRedirect(@Req() req: Request): Promise<any> {
    console.log(req.body)
    return {
      statusCode: HttpStatus.OK,
      data: req.body,
    };
  }
}
