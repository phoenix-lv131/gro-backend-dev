import { Module } from '@nestjs/common';
import { ResponsibilitiesService } from './responsibilities.service';
import { ResponsibilitiesController } from './responsibilities.controller';

@Module({
  controllers: [ResponsibilitiesController],
  providers: [ResponsibilitiesService]
})
export class ResponsibilitiesModule {}
