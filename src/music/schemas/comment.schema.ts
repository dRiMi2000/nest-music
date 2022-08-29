import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Music } from './music.schema';
import * as mongoose from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  username: string;

  @Prop()
  text: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Music'})
  music: Music;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);