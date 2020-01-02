import { ApiProperty } from '@nestjs/swagger';

export class Result {
  constructor(message: string, success: boolean, data: any, errors: any) {
    this.message = message;
    this.success = success;
    this.data = data;
    this.errors = errors;
  }

  @ApiProperty({ required: false })
  message: string;

  @ApiProperty({ required: true })
  success: boolean;

  @ApiProperty({ required: false })
  data: any;

  @ApiProperty({ required: false })
  errors: any;
}
