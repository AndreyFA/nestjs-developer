import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';

import { RoomBookService } from '../services/room-book.service';
import { BookRoomDto } from '../dtos/book-room.dto';
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { BookRoomCommand } from '../commands/book-room.command';

@Controller('v1/rooms')
export class AgendaController {
    constructor(private readonly service: RoomBookService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async book(@Req() req, @Body() model: BookRoomDto): Promise<void> {
        try {
            const command = new BookRoomCommand(req.user.document, model.roomId, model.date);
            await this.service.book(command);
        } catch (error) {
            throw new HttpException('Não foi possível realizar a reserva da sala.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
