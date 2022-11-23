import { IsEmail, IsOptional, IsString } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsString()
  public password: string;
}
