// createSongDto.ts
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty()
    readonly artist;

    // @IsDate()
    @IsDateString()
    @IsNotEmpty()
    readonly releasedDate: Date;

    @IsString()
    @IsNotEmpty()
    readonly duration: Date;

    @IsString()
    @IsOptional()
    readonly lyrics: string;
}