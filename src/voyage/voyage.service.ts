import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVoyageInput } from './dto/create-voyage.input';
import { UpdateVoyageInput } from './dto/update-voyage.input';

@Injectable()
export class VoyageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createVoyageInput: CreateVoyageInput) {
    const { vesselId, ...inputWithoutVesselId } = createVoyageInput;
    return await this.prisma.voyage.create({
      data: {
        ...inputWithoutVesselId,
        vessel: {
          connect: { id: vesselId },
        },
      },
      include: {
        vessel: true,
      },
    });
  }

  async findAll(offset: number, limit: number) {
    return await this.prisma.voyage.findMany({
      skip: offset,
      take: limit,
      include: {
        vessel: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.voyage.findUnique({
      where: { id },
      include: {
        vessel: true,
      },
    });
  }

  async update(id: number, updateVoyageInput: UpdateVoyageInput) {
    return await this.prisma.voyage.update({
      where: { id },
      data: updateVoyageInput,
    });
  }

  async remove(id: number) {
    return await this.prisma.voyage.delete({ where: { id } });
  }
}
