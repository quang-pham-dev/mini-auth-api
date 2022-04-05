import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { JwtAccessTokenGuard } from '@modules/auth/guards/jwt-access-token.guard';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './create-notes.dto';
import { UpdateNoteDto } from './update-notes.dto';
import { RequestWithUser } from '@modules/auth/interfaces/request-with-user.interface';

@Controller('notes')
@ApiTags('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessTokenGuard)
  async createNewNote(@Req() req: RequestWithUser, @Body() createNoteInfo: CreateNoteDto) {
    const note = await this.noteService.createNewNote(createNoteInfo, req?.user?.id);
    return { note };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessTokenGuard)
  async getAllNotes(@Req() req: RequestWithUser) {
    const notes = await this.noteService.getAllNotes(req.user.id);
    return { notes };
  }

  @Put(':id')
  @UseGuards(JwtAccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async updateNote(@Param('id') noteId: string, @Body() updateNoteInfo: UpdateNoteDto) {
    const updatedNote = await this.noteService.updateNote(noteId, updateNoteInfo);
    return { updatedNote };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessTokenGuard)
  async deleteNote(@Param('id') noteId: string) {
    await this.noteService.deleteNote(noteId);
    return { id: noteId };
  }
}
