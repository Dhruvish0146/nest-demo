import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/DTO/create-user-dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private userService:UsersService,
        private authService:AuthService
    ){ }

    @Post('signup')
    signup(
        @Body()createUser:CreateUserDTO
    ) : Promise<User>{
        return this.userService.createUser(createUser);
    }

    @Post("login")
    login(
        @Body()logInDto:LoginDTO
    ) : Promise<User>{
        return this.authService.login(logInDto);
    }

}