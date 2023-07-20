import { CreateVesselInput } from './create-vessel.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVesselInput extends PartialType(CreateVesselInput) {
  @Field(() => Int)
  id: number;
}
