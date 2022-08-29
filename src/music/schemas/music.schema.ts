import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';

export type MusicDocument = Music & Document;

@Schema()
export class Music {
  @Prop()
  name: string;

  @Prop()
  artist: string;

  @Prop()
  text: string;

  @Prop()
  listens: number;

  @Prop()
  picture: string; //название обложки музыки

  @Prop()
  audio: string; //название аудио дорожки

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]})
  comments: Comment[];
}

export const MusicSchema = SchemaFactory.createForClass(Music);