import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsString } from 'class-validator';

import { IUpdateNoteDto } from './update-notes.interface';

export class UpdateNoteDto implements IUpdateNoteDto {
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

  @ApiProperty({
    description: 'The updatedAt of the Note',
  })
  updatedAt: string;
}
