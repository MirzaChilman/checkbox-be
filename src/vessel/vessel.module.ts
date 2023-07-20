import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VesselResolver } from './vessel.resolver';
import { VesselService } from './vessel.service';

@Module({
  providers: [VesselResolver, VesselService, PrismaService],
})
export class VesselModule {}
