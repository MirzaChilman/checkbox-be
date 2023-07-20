import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateVesselInput } from './dto/create-vessel.input';
import { UpdateVesselInput } from './dto/update-vessel.input';
import { VesselResolver } from './vessel.resolver';
import { VesselService } from './vessel.service';

describe('VesselResolver', () => {
  let resolver: VesselResolver;
  let service: VesselService;

  const mockVessel = {
    id: 1,
    name: 'Test Vessel',
    ownerId: '1234',
    naccsCode: 'TEST001',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VesselResolver,
        {
          provide: VesselService,
          useValue: {
            findAll: jest.fn(() => [mockVessel]),
            findOne: jest.fn((id: number) => {
              if (id === mockVessel.id) {
                return mockVessel;
              } else {
                throw new NotFoundException();
              }
            }),
            create: jest.fn((createVesselInput: CreateVesselInput) => ({
              ...mockVessel,
              ...createVesselInput,
            })),
            update: jest.fn(
              (id: number, updateVesselInput: UpdateVesselInput) => ({
                ...mockVessel,
                ...updateVesselInput,
              }),
            ),
            remove: jest.fn((id: number) => {
              if (id === mockVessel.id) {
                return mockVessel;
              } else {
                throw new NotFoundException();
              }
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get<VesselResolver>(VesselResolver);
    service = module.get<VesselService>(VesselService);
  });

  describe('findAll', () => {
    it('should return an array of vessels', async () => {
      const result = await resolver.findAll(0, 1);
      expect(result).toEqual([mockVessel]);
    });
  });

  describe('findOne', () => {
    it('should return a vessel by ID', async () => {
      const result = await resolver.findOne(mockVessel.id);
      expect(result).toEqual(mockVessel);
    });

    it('should throw a NotFoundException if no vessel is found with the given ID', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => {
        throw new NotFoundException();
      });

      await expect(resolver.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('createVessel', () => {
    it('should create a new vessel', async () => {
      const createVesselInput: CreateVesselInput = {
        name: 'New Vessel',
        ownerId: '5678',
        naccsCode: 'NEW001',
      };
      const result = await resolver.createVessel(createVesselInput);
      expect(result).toEqual({
        ...mockVessel,
        ...createVesselInput,
      });
      expect(service.create).toHaveBeenCalledWith(createVesselInput);
    });
  });

  describe('updateVessel', () => {
    it('should update an existing vessel', async () => {
      const updateVesselInput: UpdateVesselInput = {
        id: mockVessel.id,
        name: 'Updated Vessel',
        ownerId: '5678',
        naccsCode: 'UPDATED001',
      };
      jest.spyOn(service, 'update').mockResolvedValueOnce({
        ...mockVessel,
        ...updateVesselInput,
      });
      const result = await resolver.updateVessel(updateVesselInput);
      expect(result).toEqual({
        ...mockVessel,
        ...updateVesselInput,
      });
      expect(service.update).toHaveBeenCalledWith(
        updateVesselInput.id,
        updateVesselInput,
      );
    });

    it('should throw a NotFoundException if no vessel is found with the given ID', async () => {
      const updateVesselInput: UpdateVesselInput = {
        id: 999,
        name: 'Updated Vessel',
        ownerId: '5678',
        naccsCode: 'UPDATED001',
      };
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException());
      expect(resolver.updateVessel(updateVesselInput)).rejects.toThrow(
        NotFoundException,
      );
      expect(service.update).toHaveBeenCalledWith(
        updateVesselInput.id,
        updateVesselInput,
      );
    });
  });
});
