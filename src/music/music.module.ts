import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileService } from 'src/file/file.service';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { Music, MusicSchema } from './schemas/music.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
        MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }])
    ],
    controllers: [MusicController],
    providers: [MusicService, FileService],
})
export class MusicModule { }
