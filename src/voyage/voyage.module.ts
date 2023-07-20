import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VoyageResolver } from './voyage.resolver';
import { VoyageService } from './voyage.service';

@Module({
  providers: [VoyageResolver, VoyageService, PrismaService],
})
export class VoyageModule {}
