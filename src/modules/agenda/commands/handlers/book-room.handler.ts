import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';

import { RoomRepository } from '../../repositories/room.repository';
import { BookRoomCommand } from '../book-room.command';
import { HttpException, HttpStatus } from '@nestjs/common';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand> {
    constructor(
        private readonly repository: RoomRepository,
        private readonly publisher: EventPublisher) { }

    async execute(command: BookRoomCommand) {
        console.log('BookRoomHandler:execute - Executando o comando...');

        const room = this.publisher.mergeObjectContext(
            await this.repository.checkAvailability(command.roomId, command.date),
        );

        if (room) {
            room.book(command.customerId);
            await this.repository.book(room);
            return;
        }

        throw new HttpException('Sala não disponível', HttpStatus.BAD_REQUEST);
    }
}
