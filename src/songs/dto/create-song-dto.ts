// createSongDto.ts
import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsArray()
    // @IsString({ each: true })
    @IsNumber({},{each:true})
    @IsNotEmpty()
    readonly artists;

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