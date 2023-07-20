import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVesselInput {
  @Field()
  name: string;

  @Field()
  ownerId: string;

  @Field()
  naccsCode: string;
}
