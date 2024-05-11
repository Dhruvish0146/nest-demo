import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import * as bcrypt from 'bcrypt'; 
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from 'src/types/payload.type';

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService,
        private jwtService:JwtService,
        private artistService: ArtistsService
    ){}

    async login(loginDto:LoginDTO) : Promise<{accessToken:string}>{
        const user = await this.userService.FindByEmail(loginDto);
        const passwordEncode=await bcrypt.compare(
            loginDto.password,user.password
        );

        if(passwordEncode){
            delete user.password;
            // return user;
           
            const payload: PayloadType =  {email:user.email,userId:user.id};

            const artist = await this.artistService.findArtist(payload.userId); 

            if(artist){
                payload.artistId=artist.id;
            }

            return {
                accessToken:this.jwtService.sign(payload),
            }
        }
        else {
            throw new UnauthorizedException("Password does not match");
        }
    }
}
