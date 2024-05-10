// song.entity.ts
import { Artist } from "src/artists/artist.entity";
import { PlayList } from "src/playlist/playlist.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity("songs")
export class Song {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToMany(()=>Artist,(artist)=>artist.songs,{cascade:true})
    @JoinTable({name:"songs_artists"})
    artists:Artist[] ;

    @Column({ type: "date" })
    releasedDate: Date;

    @Column({ type: "time" })
    duration: Date;

    @Column()
    lyrics: string;

    @ManyToOne(()=>PlayList, (playlist)=>playlist.songs)
    playList:PlayList;

}

