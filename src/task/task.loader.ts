// task.loader.ts
import * as DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Task } from '@prisma/client';

@Injectable()
export class TaskLoader {
  constructor(private readonly prisma: PrismaService) {}

  public readonly byId = new DataLoader<number, Task>(async (ids: number[]) => {
    const tasks = await this.prisma.task.findMany({
      where: { id: { in: [...ids] } },
    });
    const tasksById = tasks.reduce(
      (acc, task) => ({ ...acc, [task.id]: task }),
      {},
    );
    return ids.map(
      (id) => tasksById[id] || new Error(`No task found for id ${id}`),
    );
  });
}
