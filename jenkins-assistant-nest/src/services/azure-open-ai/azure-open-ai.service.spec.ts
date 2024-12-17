// test/azure-openai.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AzureOpenAiService } from './azure-open-ai.service';
import axios from 'axios';

jest.mock('axios'); // 模擬 axios

describe('AzureOpenAiService', () => {
  let service: AzureOpenAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AzureOpenAiService,
        {
          provide: 'AZURE_OPENAI_ENDPOINT', // 提供 endpoint
          useValue: 'https://your-azure-openai-endpoint.com',
        },
        {
          provide: 'AZURE_OPENAI_API_KEY', // 提供 apiKey
          useValue: 'your_api_key',
        },
        {
          provide: 'AZURE_OPENAI_ASSISTANT_ID', // 提供 assistantId
          useValue: 'your_assistant_id',
        },
        {
          provide: 'AZURE_OPENAI_MODEL', // 提供模型（如有需要）
          useValue: 'gpt-4o-mini',
        },
      ],
    }).compile();

    service = module.get<AzureOpenAiService>(AzureOpenAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return expected response', async () => {
    // 設置模擬返回值
    const mockResponse = {
      data: {
        id: 'thread_SSt2F2HzZeiiXYrY8nTMbEPF',
        object: 'thread',
        created_at: 1733978410,
      },
    };

    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await service.createThread();
    expect(response.id).toEqual('thread_SSt2F2HzZeiiXYrY8nTMbEPF');
    expect(response.object).toEqual('thread');
  });
});