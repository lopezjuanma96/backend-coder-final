import { IsNotEmpty, IsInt, IsNumber, IsString, MinLength, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class VoucherDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly user: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(1)
    readonly discount: number;

    @ApiProperty()
    readonly categories: string[];
}