import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { authConstants } from "./auth.constants";
import { PayloadType } from "src/types/payload.type";

@Injectable()
export class JwtStretagy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey : authConstants.secret 
        });
    }

    async validate(payload:PayloadType){
        return {
            userID:payload.userId,
            email:payload.email,
            artistID:payload.artistId,
        };
    }
}