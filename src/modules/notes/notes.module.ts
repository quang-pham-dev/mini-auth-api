import { Module } from '@nestjs/common';

import { TypegooseModule } from 'nestjs-typegoose';

import { NotesController } from './notes.controller';
import { NotesModel } from './notes.model';
import { NotesService } from './notes.service';

@Module({
  imports: [TypegooseModule.forFeature([NotesModel])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
