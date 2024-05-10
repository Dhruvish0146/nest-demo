import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayList } from './playlist.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Song } from 'src/songs/song.entity';
import { CreatePlayListDto } from './dto/create-playlist-dto';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(PlayList)
        private playlistRepository:Repository<PlayList> ,
        @InjectRepository(User)
        private userRepository:Repository<User> ,
        @InjectRepository(Song)
        private songRepository:Repository<Song> ,
    ){}

    async createPlaylist(createplayList:CreatePlayListDto) : Promise<PlayList>{
        const playList=new PlayList();
        playList.name=createplayList.name;

        const songs=await this.songRepository.findByIds(createplayList.songs);
        playList.songs=songs;

        const user=await this.userRepository.findOneBy({id:createplayList.user});
        playList.user=user;

        return this.playlistRepository.save(playList);

    }
}
