import { Injectable } from '@nestjs/common';
import { Voucher } from '../interfaces/voucher.interface';
import { randomBytes } from 'crypto';

@Injectable()
export class VoucherService {
    private readonly voucherList: Voucher[] = []

    async getAllVouchers(): Promise<Voucher[]> {
        return await this.voucherList;
    }

    async getVoucherById(id: string): Promise<Voucher> {
        return await this.voucherList.find(v => v.id === id);
    }

    async getVoucherByUser(user: string): Promise<Voucher[]> {
        return await this.voucherList.filter(v => v.user === user);
    }

    async getNewVoucherId(): Promise<string> {
        var newId: string;
        do {
            newId = randomBytes(10).toString('hex');
        } while (this.voucherList.map(v => v.id).includes(newId)) {
            newId = randomBytes(10).toString('hex');
        }
        return newId;
    }

    async addVoucher(voucher: Voucher) {
        await this.voucherList.push(voucher);
        return voucher;
    }

    async redeemVoucher(id: string): Promise<Voucher> {
        const voucherIndex: number = this.voucherList.findIndex(v => v.id === id);
        if (voucherIndex >= 0) {
            return await this.voucherList.splice(voucherIndex, 1)[0]
        }
        return undefined
    }
}
