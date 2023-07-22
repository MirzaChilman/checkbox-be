import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from '../prisma/prisma.service';
import { determineStatus } from './helpers/determineStatus';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
  async create(createTaskInput: CreateTaskInput) {
    const currentDate = new Date();

    const status = determineStatus({
      dueDate: new Date(createTaskInput.dueDate),
      currentDate,
    });

    return await this.prisma.task.create({
      data: {
        ...createTaskInput,
        createDate: currentDate,
        status,
        dueDate: new Date(createTaskInput.dueDate),
      },
    });
  }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
