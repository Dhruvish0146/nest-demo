import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from './auth.constants';
import { JwtStretagy } from './jwt.strategy';
// import { Artist } from 'src/artists/artist.entity';
import { ArtistsModule } from 'src/artists/artists.module';

@Module({
  imports:[
    UsersModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret:authConstants.secret,
      signOptions:{
        expiresIn:'1d',
      }
    }),
    ArtistsModule,
    // TypeOrmModule.forFeature([Artist])
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStretagy],
  exports:[AuthService]
})
export class AuthModule {}
