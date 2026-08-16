import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorater';
import { User } from 'src/users/entities/users.entity';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
        return this.authService.login(user, response)
    }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    async homepage() { }

}
