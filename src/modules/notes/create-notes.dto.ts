import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { ICreateNoteDto } from './create-notes.interface';

export class CreateNoteDto implements ICreateNoteDto {
  @ApiProperty({
    description: 'The Title of the Note',
  })
  @IsNotEmpty({ message: 'title is required' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'The description of the Note',
  })
  @IsNotEmpty({ message: 'description is required' })
  @IsString()
  description: string;
}
