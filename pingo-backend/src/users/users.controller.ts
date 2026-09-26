import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CurrentUser } from 'src/auth/current-user.decorater';
import { TokenPayload } from 'src/auth/token-payload.interface';
import Multer from 'multer'
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }
    @UseGuards(JwtAuthGuard)
    @Post('image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfilePictures(
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })

                    , new FileTypeValidator({ fileType: /^image\/(jpeg|png|jpg)$/ })]
            })
        ) file: Express.Multer.File,
        @CurrentUser() user: TokenPayload
    ) {

        return this.usersService.uplaodImage(file.buffer, user._id)
    }


}
