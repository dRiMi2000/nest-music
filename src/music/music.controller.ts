import { Body, Controller, Delete, Get, Param, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicService } from './music.service';

@Controller(`/tracks`)
export class MusicController {
    constructor(private readonly musicServce: MusicService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'audio', maxCount: 1 },
    ]))
    create(@UploadedFiles() files, @Body() createMusicDto: CreateMusicDto) {
        const { picture, audio } = files
        return this.musicServce.create(createMusicDto, picture[0], audio[0])
    }

    @Get()
    getAll(@Query('count') count: number,
        @Query('offset') offset: number) {
        return this.musicServce.getAll(count, offset)
    }

    @Get('/search')
    search(@Query('query') query: string) {
        return this.musicServce.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: ObjectId) {
        return this.musicServce.getOne(id)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.musicServce.delete(id)
    }

    @Post('/comment')
    addComment(@Body() createCommentDto: CreateCommentDto) {
        return this.musicServce.addComment(createCommentDto)
    }

    @Post('/listen/:id')
    listen(@Param('id') id: ObjectId) {
        return this.musicServce.listen(id)
    }

}