import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class AuthService {
    constructor(
        private userService : UsersService
    ){}

    async login(loginDto:LoginDTO) : Promise<User>{
        const user = await this.userService.FindByEmail(loginDto);
        const passwordEncode=await bcrypt.compare(
            loginDto.password,user.password
        );

        if(passwordEncode){
            delete user.password;
            return user;
        }
        else {
            throw new UnauthorizedException("Password does not match");
        }
    }
}
