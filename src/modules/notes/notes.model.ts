import { DocumentType, modelOptions, prop, Ref, Severity } from '@typegoose/typegoose';
import { IBaseModel } from '@interfaces/base-model.interface';
import { INote } from './notes-model.interface';
import { User } from '@modules/users/models/user.model';

export type NotesDocument = DocumentType<NotesModel>;

@modelOptions({ options: { customName: 'Note', allowMixed: Severity.ALLOW } })
export class NotesModel implements INote, IBaseModel {
  @prop({ unique: true })
  id: string;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop({ ref: () => User, type: () => String })
  user: Ref<User, string>;

  @prop({ default: Date })
  createdAt: string;

  @prop({ default: Date })
  updatedAt: string;

  @prop({ default: Date })
  deletedAt: string;
}
