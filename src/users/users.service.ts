import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './DTO/create-user-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository:Repository<User>
    ){}

    async createUser(createUser:CreateUserDTO):Promise<User>{
        const saltOrRound=10;
        createUser.password=await bcrypt.hash(createUser.password,saltOrRound);
        const user =await this.userRepository.save(createUser);
        delete user.password;
        return user;
    }
}
