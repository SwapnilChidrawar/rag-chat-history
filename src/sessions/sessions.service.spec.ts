import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SessionsService } from './sessions.service';
import { Session } from './schemas/session.schema';

describe('SessionsService', () => {
  let service: SessionsService;
  const mockSessionModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: getModelToken(Session.name),
          useValue: mockSessionModel,
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a session', async () => {
      const createSessionDto = { userId: 'user1', title: 'Test' };
      mockSessionModel.create.mockResolvedValue(createSessionDto);
      
      const result = await service.create(createSessionDto);
      expect(result).toEqual(createSessionDto);
    });
  });
});