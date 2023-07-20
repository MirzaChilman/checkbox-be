import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Vessel } from '../../vessel/entities/vessel.entity';

@ObjectType()
export class Voyage {
  @Field(() => Int)
  id: number;

  @Field(() => Vessel)
  vessel: Vessel;

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
