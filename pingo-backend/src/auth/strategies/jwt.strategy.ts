import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenPayload } from "../token-payload.interface";
import { Request } from "express";
import { getJwt } from "../jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly configService: ConfigService) {

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                    if (request.cookies.Authentication) {
                        return request.cookies.Authentication
                    }
                    const authorization = request.headers.authorization
                    return getJwt(authorization)
                }

            ]),
            secretOrKey: configService.getOrThrow('JWT_SECRET')
        });
    }

    validate(payload: TokenPayload) {
        return payload
    }

    //code to validate the token

}