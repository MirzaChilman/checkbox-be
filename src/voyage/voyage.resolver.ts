import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVoyageInput } from './dto/create-voyage.input';
import { UpdateVoyageInput } from './dto/update-voyage.input';
import { Voyage } from './entities/voyage.entity';
import { VoyageService } from './voyage.service';

@Resolver(() => Voyage)
export class VoyageResolver {
  constructor(private readonly voyageService: VoyageService) {}

  @Mutation(() => Voyage)
  createVoyage(
    @Args('createVoyageInput') createVoyageInput: CreateVoyageInput,
  ) {
    return this.voyageService.create(createVoyageInput);
  }

  @Query(() => [Voyage], { name: 'voyages' })
  findAll(@Args('offset') offset: number, @Args('limit') limit: number) {
    return this.voyageService.findAll(offset, limit);
  }

  @Query(() => Voyage, { name: 'voyage' })
  findOne(@Args('id', { type: () => Int }) id?: number) {
    return this.voyageService.findOne(id);
  }

  @Mutation(() => Voyage)
  updateVoyage(
    @Args('updateVoyageInput') updateVoyageInput: UpdateVoyageInput,
  ) {
    return this.voyageService.update(updateVoyageInput.id, updateVoyageInput);
  }

  @Mutation(() => Voyage)
  removeVoyage(@Args('id', { type: () => Int }) id: number) {
    return this.voyageService.remove(id);
  }
}
