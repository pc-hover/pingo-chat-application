import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../token-payload.interface";
import { Request } from "express";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService: ConfigService) {

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request.cookies.Authentication,

            ]),
            secretOrKey: configService.getOrThrow('JWT_SECRET')
        });
    }

    validate(payload: TokenPayload) {
        return payload
    }

    //code to validate the token

}