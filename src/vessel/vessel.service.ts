import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVesselInput } from './dto/create-vessel.input';
import { UpdateVesselInput } from './dto/update-vessel.input';

const TTL = 60; //redis cache time in seconds
@Injectable()
export class VesselService {
  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    private prisma: PrismaService,
  ) {}
  async create(createVesselInput: CreateVesselInput) {
    return await this.prisma.vessel.create({
      data: { ...createVesselInput },
    });
  }

  async findAll(offset: number, limit: number) {
    const cacheKey = `vessels:${offset}:${limit}`;
    const cachedData = await this.redisClient.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const vessels = await this.prisma.vessel.findMany({
      skip: offset,
      take: limit,
    });
    await this.redisClient.set(cacheKey, JSON.stringify(vessels), 'EX', TTL);
    return vessels;
  }

  async findOne(id: number) {
    return await this.prisma.vessel.findUnique({ where: { id } });
  }

  async update(id: number, updateVesselInput: UpdateVesselInput) {
    return await this.prisma.vessel.update({
      where: { id },
      data: { ...updateVesselInput },
    });
  }

  async remove(id: number) {
    return await this.prisma.vessel.delete({ where: { id } });
  }
}
