import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateVesselInput } from './dto/create-vessel.input';
import { UpdateVesselInput } from './dto/update-vessel.input';
import { Vessel } from './entities/vessel.entity';
import { VesselService } from './vessel.service';

@Resolver(() => Vessel)
export class VesselResolver {
  constructor(private readonly vesselService: VesselService) {}

  @Mutation(() => Vessel)
  createVessel(
    @Args('createVesselInput') createVesselInput: CreateVesselInput,
  ) {
    return this.vesselService.create(createVesselInput);
  }

  @Query(() => [Vessel], { name: 'vessels' })
  findAll(@Args('offset') offset: number, @Args('limit') limit: number) {
    return this.vesselService.findAll(offset, limit);
  }

  @Query(() => Vessel, { name: 'vessel' })
  findOne(@Args('id') id: number) {
    return this.vesselService.findOne(id);
  }

  @Mutation(() => Vessel)
  updateVessel(
    @Args('updateVesselInput') updateVesselInput: UpdateVesselInput,
  ) {
    return this.vesselService.update(updateVesselInput.id, updateVesselInput);
  }

  @Mutation(() => Vessel)
  removeVessel(@Args('id') id: number) {
    return this.vesselService.remove(id);
  }
}
