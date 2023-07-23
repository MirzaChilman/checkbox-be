import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { TaskLoader } from './task.loader';

@Module({
  providers: [TaskResolver, TaskService, TaskLoader, PrismaService],
})
export class TaskModule {}
