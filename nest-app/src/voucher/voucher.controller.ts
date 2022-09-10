import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { VoucherDto } from '../dtos/vocuher.dto';
import { Voucher } from '../interfaces/voucher.interface';
import { VoucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
    constructor(private readonly service: VoucherService){}

    @Get()
    async getVouchers(@Query('user') user : string): Promise<Voucher[]> {
        if (user){
            return await this.service.getVoucherByUser(user);
        }
        return await this.service.getAllVouchers()
    }

    @Get('/:id')
    async getById(@Param('id') id: string): Promise<Voucher> {
        return await this.service.getVoucherById(id);
    }

    @Post()
    async postVoucher(@Body() voucher: VoucherDto): Promise<Voucher> {
        const voucherId: string = await this.service.getNewVoucherId();
        return await this.service.addVoucher({...voucher, id: voucherId})
    }

    @Delete('/:id')
    async deleteVoucher(@Param('id') id: string): Promise<Voucher> {
        return await this.service.redeemVoucher(id);
    }
}
