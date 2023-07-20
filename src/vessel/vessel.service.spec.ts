import 'reflect-metadata';

import { getRedisToken } from '@liaoliaots/nestjs-redis';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateVesselInput } from './dto/create-vessel.input';
import { VesselService } from './vessel.service';

describe('VesselService', () => {
  let service: VesselService;
  let prismaService: PrismaService;
  let get: jest.Mock;
  let set: jest.Mock;
  let del: jest.Mock;

  beforeEach(async () => {
    get = jest.fn();
    set = jest.fn();
    del = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VesselService,
        PrismaService,
        {
          provide: getRedisToken('default'),
          useValue: {
            get,
            set,
            del,
          },
        },
      ],
    }).compile();

    service = module.get<VesselService>(VesselService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await prismaService.$disconnect;
  });

  describe('create', () => {
    it('should create a new vessel', async () => {
      const createVesselInput: CreateVesselInput = {
        name: 'Test Vessel',
        ownerId: '1234',
        naccsCode: 'TEST001',
      };

      const mockCreatedVessel = {
        id: 1,
        ...createVesselInput,
      };

      jest
        .spyOn(prismaService.vessel, 'create')
        .mockResolvedValue(mockCreatedVessel);

      const result = await service.create(createVesselInput);
      expect(result).toEqual(mockCreatedVessel);
    });
  });

  describe('findAll', () => {
    const offset = 0;
    const limit = 10;
    const mockVessels = [
      {
        id: 1,
        name: 'Vessel 1',
        ownerId: '1234',
        naccsCode: 'TEST001',
      },
      {
        id: 2,
        name: 'Vessel 2',
        ownerId: '5678',
        naccsCode: 'TEST002',
      },
    ];

    it('should return cached data if available', async () => {
      const cacheKey = `vessels:${offset}:${limit}`;

      get.mockResolvedValue(JSON.stringify(mockVessels));
      const result = await service.findAll(offset, limit);

      expect(get).toHaveBeenCalledWith(cacheKey);
      expect(set).not.toHaveBeenCalled();
      expect(result).toEqual(mockVessels);
    });

    it('should fetch data from the database and cache it if no cached data is available', async () => {
      const cacheKey = `vessels:${offset}:${limit}`;
      get.mockResolvedValue(null);
      jest
        .spyOn(prismaService.vessel, 'findMany')
        .mockResolvedValue(mockVessels);

      const result = await service.findAll(offset, limit);

      expect(get).toHaveBeenCalledWith(cacheKey);
      expect(prismaService.vessel.findMany).toHaveBeenCalled();
      expect(set).toHaveBeenCalledWith(
        cacheKey,
        JSON.stringify(mockVessels),
        'EX',
        60,
      );
      expect(result).toEqual(mockVessels);
    });

    it('should throw an error if Redis', async () => {
      get.mockRejectedValue(new Error('Redis error'));
      jest.spyOn(prismaService.vessel, 'findMany');

      await expect(service.findAll(offset, limit)).rejects.toThrow(
        'Redis error',
      );
    });
  });

  describe('findOne', () => {
    it('should return a single vessel by ID', async () => {
      const mockVessel = {
        id: 1,
        name: 'Test Vessel',
        ownerId: '1234',
        naccsCode: 'TEST001',
      };

      jest
        .spyOn(prismaService.vessel, 'findUnique')
        .mockResolvedValue(mockVessel);

      const result = await service.findOne(1);
      expect(result).toEqual(mockVessel);
    });

    it('should throw a NotFoundException if no vessel is found', async () => {
      jest.spyOn(prismaService.vessel, 'findUnique').mockResolvedValue(null);

      expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing vessel', async () => {
      const createVesselInput: CreateVesselInput = {
        name: 'Test Vessel',
        ownerId: '1234',
        naccsCode: 'TEST001',
      };

      const mockCreatedVessel = {
        id: 1,
        ...createVesselInput,
      };

      const mockUpdatedVessel = {
        id: 1,
        name: 'updated vessel',
        ...createVesselInput,
      };

      jest
        .spyOn(prismaService.vessel, 'create')
        .mockResolvedValue(mockCreatedVessel);

      const result = await service.create(createVesselInput);
      expect(result).toEqual(mockCreatedVessel);

      jest
        .spyOn(prismaService.vessel, 'update')
        .mockResolvedValue(mockUpdatedVessel);

      const updated = await service.update(
        mockCreatedVessel.id,
        mockUpdatedVessel,
      );

      expect(updated).toEqual(mockUpdatedVessel);
    });

    it('should throw a NotFoundException if no vessel is found with the given ID', async () => {
      const createVesselInput: CreateVesselInput = {
        name: 'Test Vessel',
        ownerId: '1234',
        naccsCode: 'TEST001',
      };

      const mockCreatedVessel = {
        id: 1,
        ...createVesselInput,
      };

      const mockUpdatedVessel = {
        id: 1,
        name: 'updated vessel',
        ...createVesselInput,
      };

      jest
        .spyOn(prismaService.vessel, 'create')
        .mockResolvedValue(mockCreatedVessel);

      const result = await service.create(createVesselInput);
      expect(result).toEqual(mockCreatedVessel);

      jest.spyOn(prismaService.vessel, 'update').mockResolvedValue(null);

      expect(service.update(2, mockUpdatedVessel)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove vessel', async () => {
      const createVesselInput: CreateVesselInput = {
        name: 'Test Vessel',
        ownerId: '1234',
        naccsCode: 'TEST001',
      };

      const mockCreatedVessel = {
        id: 1,
        ...createVesselInput,
      };

      jest
        .spyOn(prismaService.vessel, 'create')
        .mockResolvedValue(mockCreatedVessel);
      const created = await service.create(createVesselInput);
      expect(created).toEqual(mockCreatedVessel);

      jest.spyOn(prismaService.vessel, 'delete').mockResolvedValue(null);
      const deleted = await service.remove(mockCreatedVessel.id);
      expect(deleted).toEqual(deleted);
    });
  });
});
