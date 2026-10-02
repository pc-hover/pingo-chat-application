import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/users.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { getJwt } from './jwt';
import { UnauthorizedException } from '@nestjs/common';
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

    verifyWs(request: Request, connectionParams: any = {}): TokenPayload {
        const tokenFromParams = getJwt(connectionParams?.token);

        const authCookie = request?.headers?.cookie
            ?.split(';')
            .map((c) => c.trim())
            .find((c) => c.startsWith('Authentication='))
            ?.substring('Authentication='.length);

        const jwt = tokenFromParams || authCookie;
        if (!jwt) throw new UnauthorizedException();

        return this.jwtService.verify(jwt);
    }
    logout(response: Response) {
        response.cookie("Authentication", "", {
            httpOnly: true,
            expires: new Date()
        })
    }
}
