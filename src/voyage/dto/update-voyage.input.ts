import { CreateVoyageInput } from './create-voyage.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVoyageInput extends PartialType(CreateVoyageInput) {
  @Field(() => Int)
  id: number;
}
