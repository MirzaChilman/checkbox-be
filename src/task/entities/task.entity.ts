// src/task.entity.ts

import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Status } from '../types';

@ObjectType()
export class Task {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  dueDate: Date;

  @Field()
  createDate: Date;

  @Field((type) => Status) // Use the enum type for the field
  status: Status;
}
