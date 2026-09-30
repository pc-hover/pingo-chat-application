import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/users.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { getJwt } from './jwt';

@Injectable()
export class AuthService {

    constructor(private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }
    async login(user: User, response: Response) {

        const expires = new Date()
        expires.setSeconds(expires.getSeconds() + parseInt(this.configService.getOrThrow('JWT_EXPIRATION')))
        const tokenPayload: TokenPayload = {
            ...user,
            _id: user._id.toHexString()
        };

        const token = this.jwtService.sign(tokenPayload)
        response.cookie('Authentication', token, {
            httpOnly: true,
            expires,
        });

        return token

    }

    verifyWs(request: Request, connectionParams: any): TokenPayload {
        const cookies: string[] = request.headers.cookie?.split("; ")
        const authCookie = cookies?.find((cookie) => cookie.includes('Authentication')
        )
        const jwt = authCookie?.split('Authentication=')[1]
        return this.jwtService.verify(jwt || getJwt(connectionParams.token))

    }
    logout(response: Response) {
        response.cookie("Authentication", "", {
            httpOnly: true,
            expires: new Date()
        })
    }
}
