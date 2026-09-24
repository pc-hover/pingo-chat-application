import { Controller, Get, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messageService: MessagesService) { }
    @Get('count')
    @UseGuards(JwtAuthGuard)
    async countMessages(@Query('chatId') chatId: string) {
        return this.messageService.countMessages(chatId)
    }
}
