export interface Voucher {
    readonly id: string;
    readonly user: string;
    readonly discount: number;
    readonly categories: string[];
}