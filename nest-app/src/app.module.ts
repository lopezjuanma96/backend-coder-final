import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VoucherController } from './voucher/voucher.controller';
import { VoucherService } from './voucher/voucher.service';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [VoucherModule],
  controllers: [AppController, VoucherController],
  providers: [AppService, VoucherService],
})
export class AppModule {}
