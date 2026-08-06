import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/users/entities/users.entity';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {

    constructor(private readonly configService: ConfigService,
        private readonly jwtService: JwtService
    ) { }
    async login(user: User, response: Response) {
        console.log(user)
        const expires = new Date()
        expires.setSeconds(expires.getSeconds() + this.configService.getOrThrow("JWT_EXPIRATION"))

        const tokenPayload: TokenPayload = {
            _id: user._id.toHexString(),
            email: user.email
        };

        const jwtToken = this.jwtService.sign(tokenPayload)
        response.cookie('Authentication', jwtToken, {
            httpOnly: true,
            expires
        });

    }
}
