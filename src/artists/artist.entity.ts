import { Song } from "src/songs/song.entity";
import { User } from "src/users/user.entity";
import { Entity, OneToOne, JoinColumn, PrimaryGeneratedColumn, ManyToMany } from "typeorm";

@Entity('artists')
export class Artist {
  // A user can register as an artist
  // Each artist will have only a user profile
  @PrimaryGeneratedColumn()
  id:number;  

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @ManyToMany(()=>Song,(song)=>song.artists)
  songs:Song[];

}
