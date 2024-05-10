import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './song.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';

@Injectable({ scope: Scope.TRANSIENT })
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
  ) {}

  // private readonly songs=[];

  async create(songDTO: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artist = songDTO.artist;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    return await this.songRepository.save(song);
  }

  async findAll() : Promise<Song[]> {
    return this.songRepository.find();
  }

  async findById(id:number) : Promise<Song>{
    return this.songRepository.findOneBy({id});
  }

  async removeById(id:number) : Promise<void>{
    await this.songRepository.delete({id});
  }

  async update(id:number,updateSong:UpdateSongDto) : Promise<UpdateResult>{
    return this.songRepository.update(id,updateSong);
  }
}
