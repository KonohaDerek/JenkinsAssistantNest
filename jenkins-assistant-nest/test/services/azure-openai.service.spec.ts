// test/azure-openai.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AzureOpenAiService } from '../../src/services/azure-open-ai/azure-open-ai.service';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'

jest.mock('axios', () => {
    return {
        ...(jest.requireActual('axios') as object),
        create: jest.fn().mockReturnValue(jest.requireActual('axios')),
    };
});

const mockAdapter = new MockAdapter(axios);

describe('AzureOpenAiService', () => {
    let service: AzureOpenAiService;
    beforeEach(async () => {
       const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: AzureOpenAiService,
                    useFactory: () => {
                        return new AzureOpenAiService(
                            'https://endpoint.openai.azure.com', // 端點
                            'api_key', // apiKey
                            '123123', // assistantId
                            'gpt-4o-mini' // 模型
                        );
                    },
                },
            ],
        }).compile();

        service = module.get<AzureOpenAiService>(AzureOpenAiService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should return createThread response', async () => {
        // 設置模擬返回值
        const mockResponse = {
                id: 'thread_SSt2F2HzZeiiXYrY8nTMbEPF',
                object: 'thread',
                created_at: 1733978410,
        };
        mockAdapter.onPost().reply(200, mockResponse);
        const response = await service.createThread();
        console.log(response);
        expect(response.id).toEqual('thread_SSt2F2HzZeiiXYrY8nTMbEPF');
        expect(response.object).toEqual('thread');
    });

    it('should return createMessage response', async () => {
        // 設置模擬返回值
        const mockResponse = {
            "id": "msg_rNZU6cKPFyN3qC5Q5A8Jj5WK",
            "object": "thread.message",
            "created_at": 1734082477,
            "assistant_id": null,
            "thread_id": "thread_3USQto4JmJa3MHUHktrxSzxp",
            "run_id": null,
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": {
                        "value": "Hello, I'm a user.",
                        "annotations": []
                    }
                }
            ],
            "attachments": [],
            "metadata": {}
        };
        mockAdapter.onPost().reply(200, mockResponse);
        const response = await service.createMessage(mockResponse.thread_id, "Hello, I'm a user.");
        console.log(response);
        expect(response.id).toEqual(mockResponse.id);
        expect(response.object).toEqual(mockResponse.object);
        expect(response.thread_id).toEqual(mockResponse.thread_id);
    });

    it('should return createRun response', async () => {
        // 設置模擬返回值
        const mockResponse = {
            "id": "run_tbn3zrpmhExv2vPFZDyb2jdI",
            "object": "thread.run",
            "created_at": 1733978410,
            "assistant_id": "asst_K6EyYGLo6La3MqwvYmDaNEv6",
            "thread_id": "thread_3USQto4JmJa3MHUHktrxSzxp",
            "status": "queued",
            "started_at": null,
            "expires_at": 1733979010,
            "cancelled_at": null,
            "failed_at": null,
            "completed_at": null,
            "required_action": null,
            "last_error": null,
            "model": "gpt-4o-mini",
            "instructions": "你是一個Jenkins 錯誤訊息的助理。\n我會丟給你一段的錯誤訊息。\n回覆應包含以下項目\n - 簡述錯誤內容 ： 請簡潔扼要的說明是什麼錯誤\n - 錯誤分析\n - 解決方案\n - 處理類型：如果是屬於程式碼的錯誤，顯示處理類型： RD處理，如果不是則顯示處理類型: DevOps 處理。\n - 回覆請使用正體中文回答。\n - 不需要其他多餘的回應 ",
            "tools": [],
            "tool_resources": {},
            "metadata": {},
            "temperature": 1.0,
            "top_p": 1.0,
            "max_completion_tokens": null,
            "max_prompt_tokens": null,
            "truncation_strategy": {
                "type": "auto",
                "last_messages": null
            },
            "incomplete_details": null,
            "usage": null,
            "response_format": "auto",
            "tool_choice": "auto",
            "parallel_tool_calls": true
        };

        const mockGetResponse = {
            "id": "run_rOoRFaqJH50D7tZ66nhEKriQ",
            "object": "thread.run",
            "created_at": 1734083327,
            "assistant_id": "asst_K6EyYGLo6La3MqwvYmDaNEv6",
            "thread_id": "thread_hQawFSUolfJ9Kpx34GKRVghR",
            "status": "completed",
            "started_at": 1734083328,
            "expires_at": null,
            "cancelled_at": null,
            "failed_at": 1734083332,
            "completed_at": null,
            "required_action": null,
            "last_error": {
                "code": "rate_limit_exceeded",
                "message": "Rate limit is exceeded. Try again in 9 seconds."
            },
            "model": "gpt-4o-mini",
            "instructions": "你是一個Jenkins 錯誤訊息的助理。\n我會丟給你一段的錯誤訊息。\n回覆應包含以下項目\n - 簡述錯誤內容 ： 請簡潔扼要的說明是什麼錯誤\n - 錯誤分析\n - 解決方案\n - 處理類型：如果是屬於程式碼的錯誤，顯示處理類型： RD處理，如果不是則顯示處理類型: DevOps 處理。\n - 回覆請使用正體中文回答。\n - 不需要其他多餘的回應 ",
            "tools": [],
            "tool_resources": {},
            "metadata": {},
            "temperature": 1.0,
            "top_p": 1.0,
            "max_completion_tokens": null,
            "max_prompt_tokens": null,
            "truncation_strategy": {
                "type": "auto",
                "last_messages": null
            },
            "incomplete_details": null,
            "usage": {
                "prompt_tokens": 0,
                "completion_tokens": 0,
                "total_tokens": 0
            },
            "response_format": "auto",
            "tool_choice": "auto",
            "parallel_tool_calls": true
        }
        mockAdapter.onPost().reply(200, mockResponse);
        mockAdapter.onGet().reply(200, mockGetResponse);
        const response = await service.createRun(mockResponse.thread_id);
        console.log(response);
        expect(response.id).toEqual(mockResponse.id);
        expect(response.object).toEqual(mockResponse.object);
        expect(response.thread_id).toEqual(mockResponse.thread_id);
    });
});