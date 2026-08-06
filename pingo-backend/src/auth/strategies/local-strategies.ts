
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usersService: UsersService) {
        super({
            usernameField: "email",
        });
    }

    async validate(username: string, password: string): Promise<any> {
        try {

            return await this.usersService.verifyUser(username, password);
        }
        catch (error) {
            throw new UnauthorizedException(error)
        }
    }
}
