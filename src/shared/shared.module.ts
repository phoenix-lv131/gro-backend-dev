import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [],
    controllers: []
})
export class SharedModule {}