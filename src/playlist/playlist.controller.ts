import { Body, Controller, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlayListDto } from './dto/create-playlist-dto';
import { PlayList } from './playlist.entity';

@Controller('playlist')
export class PlaylistController {
    constructor(
        private playListService : PlaylistService
    ){}

    @Post()
    createPlaylist(
        @Body()playListDto:CreatePlayListDto
    ) : Promise<PlayList>{
        return this.playListService.createPlaylist(playListDto);
    }
}
