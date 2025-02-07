import { Module } from '@nestjs/common';
import { HashService } from './hash.service';

@Module({
    providers: [HashService],
    exports: [HashService], // 👈 Exporting HashService so other modules can use it
})
export class HashModule { }
