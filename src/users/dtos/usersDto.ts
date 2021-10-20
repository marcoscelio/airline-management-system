import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserAddressDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  address: string;
  @IsNotEmpty()
  zipcode: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  state: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class CreateUserDto {
  id: number;
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  cpf: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  zipcode: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  status: string;
  @IsNotEmpty()
  addreses: CreateUserAddressDto;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export class UserEmailDto {
  @IsNotEmpty()
  email: string;  
}

export class LoginDto {
  @IsNotEmpty()
  email: string;  
  @IsNotEmpty()
  password: string;  
}
