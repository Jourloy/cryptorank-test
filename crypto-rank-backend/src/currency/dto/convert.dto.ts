import { ApiProperty } from '@nestjs/swagger';

export class ConvertDto {
  @ApiProperty({example: `bitcoin`})
  from: string;

  @ApiProperty({required: false, example: `tether`})
  to: string;

  @ApiProperty({required: false, example: `100`})
  amount: number;
}