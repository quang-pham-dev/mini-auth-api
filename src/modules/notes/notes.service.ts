import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { ReturnModelType } from '@typegoose/typegoose';
import { InjectModel } from 'nestjs-typegoose';

import { NotesModel } from './notes.model';
import { CreateNoteDto } from './create-notes.dto';
import { UpdateNoteDto } from './update-notes.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NotesModel)
    private readonly notesModel: ReturnModelType<typeof NotesModel>,
  ) {}

  async createNewNote(
    createNoteInfo: CreateNoteDto,
    userId: string,
  ): Promise<NotesModel | undefined> {
    try {
      const newNote = await this.notesModel.create({
        id: nanoid(24),
        ...createNoteInfo,
        user: userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return newNote;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getAllNotes(id: string): Promise<any> {
    const allNotes = await this.notesModel.find({ user: id });
    return allNotes;
  }

  async updateNote(noteId: string, updateNoteInfo: UpdateNoteDto): Promise<any> {
    try {
      const foundNote = await this.notesModel.findOne({ id: noteId });

      if (!foundNote) {
        throw new NotFoundException('Note with this id does not exist');
      }

      updateNoteInfo.updatedAt = new Date().toISOString();
      const updatedNote = await this.notesModel.updateOne(
        { id: noteId },
        {
          ...updateNoteInfo,
        },
      );
      return updatedNote;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteNote(noteId: string): Promise<any> {
    try {
      const foundNote = await this.notesModel.findOne({ id: noteId });
      if (!foundNote) {
        throw new NotFoundException('Note with this id does not exist');
      }
      const deletedNote = await this.notesModel.deleteOne(
        { id: noteId },
        {
          ...foundNote,
        },
      );
      return deletedNote;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
