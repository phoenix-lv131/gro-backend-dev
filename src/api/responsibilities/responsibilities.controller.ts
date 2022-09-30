import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResponsibilitiesService } from './responsibilities.service';
import { CreateResponsibilityDto } from './dto/create-responsibility.dto';
import { UpdateResponsibilityDto } from './dto/update-responsibility.dto';

@Controller('responsibilities')
export class ResponsibilitiesController {
  constructor(private readonly responsibilitiesService: ResponsibilitiesService) {}

  @Post()
  create(@Body() createResponsibilityDto: CreateResponsibilityDto) {
    return this.responsibilitiesService.create(createResponsibilityDto);
  }

  @Get()
  findAll() {
    return this.responsibilitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.responsibilitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResponsibilityDto: UpdateResponsibilityDto) {
    return this.responsibilitiesService.update(+id, updateResponsibilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.responsibilitiesService.remove(+id);
  }
}
