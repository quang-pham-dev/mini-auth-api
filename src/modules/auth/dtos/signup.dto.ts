import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ISignUpDto } from '../interfaces/signUp-dto.interface';

export class SignUpDto implements ISignUpDto {
  @ApiProperty({ description: 'The email of the User' })
  @IsEmail()
  @IsNotEmpty()
  readonly emailAddress: string;

  @ApiProperty({ description: 'The firstName of the User' })
  @MinLength(2)
  @MaxLength(50)
  readonly firstName: string;

  @ApiProperty({ description: 'The lastName of the User' })
  @MinLength(2)
  @MaxLength(50)
  readonly lastName: string;

  @ApiProperty({ description: 'The password of the User' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;

  @ApiProperty({ description: 'The phoneNumber of the User' })
  @IsNotEmpty()
  @IsPhoneNumber('VN')
  readonly phoneNumber: string;

  @Optional()
  readonly deleteFlag: boolean;

  @Optional()
  readonly isEmailConfirmed: boolean;
}
