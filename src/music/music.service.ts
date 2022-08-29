import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { FileService, FileType } from 'src/file/file.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateMusicDto } from './dto/create-music.dto';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Music, MusicDocument } from './schemas/music.schema';

@Injectable()
export class MusicService {
    constructor(
        @InjectModel(Music.name) private musicModel: Model<MusicDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private fileService: FileService
    ) { }

    async create(createMusicDto: CreateMusicDto, picture, audio): Promise<Music> {
        const audioPath = this.fileService.createFile(FileType.AUDIO, audio)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const music = await this.musicModel.create({ ...createMusicDto, listens: 0, audio: audioPath, picture: picturePath })
        return music
    }

    async getAll(count = 10, offset = 0): Promise<Music[]> {
        const musics = await this.musicModel.find().skip(Number(offset)).limit(Number(count)) //.exec() для чего нужен    
        return musics
    }

    async getOne(id: ObjectId): Promise<Music> {
        const music = await this.musicModel.findById(id).populate('comments')
        return music
    }

    async delete(id: ObjectId): Promise<Music> {
        const music = await this.musicModel.findByIdAndDelete(id)
        return music
    }

    async addComment(createCommentDto: CreateCommentDto): Promise<Comment> {
        const music = await this.musicModel.findById(createCommentDto.musicId)
        const comment = await this.commentModel.create({ ...createCommentDto })
        music.comments.push(comment._id)
        await music.save()
        return comment
    }

    async listen(id: ObjectId) {
        const music = await this.musicModel.findById(id)
        music.listens += 1
        await music.save()
    }

    async search(query: string): Promise<Music[]> {
        const musics = await this.musicModel.find({
            name: { $regex: new RegExp(query, 'i') }
        })
        return musics
    }




}