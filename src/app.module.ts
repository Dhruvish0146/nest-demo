import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
// import path from 'path';
import { SongsController } from './songs/songs.controller';
import { DevConfigService } from './Providers/devConfigService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Song } from './songs/song.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Artist } from './artists/artist.entity';
import { AuthModule } from './auth/auth.module';
import { PlaylistModule } from './playlist/playlist.module';
import { PlayList } from './playlist/playlist.entity';
import { ArtistsModule } from './artists/artists.module';


@Module({
  imports: [
    SongsModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'localhost',
      port:3306,
      username:'root',
      password:'rootpassword',
      database:'test',
      entities:[Song,User,Artist,PlayList],
      synchronize:true
    }),
    UsersModule,
    AuthModule,
    ArtistsModule,
    PlaylistModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    DevConfigService
  ],
})
export class AppModule implements NestModule {

  constructor(private dataSource:DataSource){
    console.log(dataSource.driver.database)
  }
  configure(consumer: MiddlewareConsumer) {
      // consumer.apply(LoggerMiddleware).forRoutes('songs'); option 1
      // consumer
      // .apply(LoggerMiddleware)
      // .forRoutes({path:'songs',method:RequestMethod.POST}); option 2

      consumer.apply(LoggerMiddleware)
              .forRoutes(SongsController);
  }
}
