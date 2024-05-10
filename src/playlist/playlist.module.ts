import { Module } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayList } from './playlist.entity';
import { User } from 'src/users/user.entity';
import { Song } from 'src/songs/song.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlayList,User,Song])
  ],
  providers: [PlaylistService],
  controllers: [PlaylistController]
})
export class PlaylistModule {}
