import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { MusicModule } from './music/music.module';
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    MusicModule,
    FileModule,
    MongooseModule.forRoot('mongodb://localhost/musicDB'),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
