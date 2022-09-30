import { Injectable } from '@nestjs/common';
import { CreateResponsibilityDto } from './dto/create-responsibility.dto';
import { UpdateResponsibilityDto } from './dto/update-responsibility.dto';

@Injectable()
export class ResponsibilitiesService {
  create(createResponsibilityDto: CreateResponsibilityDto) {
    return 'This action adds a new responsibility';
  }

  findAll() {
    return `This action returns all responsibilities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} responsibility`;
  }

  update(id: number, updateResponsibilityDto: UpdateResponsibilityDto) {
    return `This action updates a #${id} responsibility`;
  }

  remove(id: number) {
    return `This action removes a #${id} responsibility`;
  }
}
