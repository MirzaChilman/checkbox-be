import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskLoader } from './task.loader';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Task)
export class TaskResolver {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskLoader: TaskLoader,
  ) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    console.log('999999999');

    return this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  async findAll() {
    const tasks = await this.taskService.findAll();
    return Promise.all(tasks.map((task) => this.taskLoader.byId.load(task.id)));
  }

  @Query(() => Task, { name: 'task' })
  async findOne(@Args('id', { type: () => Int }) id: number) {}

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => Int }) id: number) {
    return this.taskService.remove(id);
  }
}
