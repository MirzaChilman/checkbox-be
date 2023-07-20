import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vessel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  ownerId: string;

  @Field()
  naccsCode: string;
}
