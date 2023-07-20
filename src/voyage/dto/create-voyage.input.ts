import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVoyageInput {
  @Field(() => Int)
  vesselId: number;

  @Field()
  origin: string;

  @Field()
  destination: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;
}
