import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ThreadsResponse } from './models/threads-response.model';
import { CreateMessageResponse, MessageData, MessageResponse } from './models/message-response.model';
import { RunResponse } from './models/run-response.model';

@Injectable()
export class AzureOpenAiService {
    private readonly logger = new Logger(AzureOpenAiService.name);
    private readonly axiosInstance: AxiosInstance;
    private readonly assistantId: string;
    private readonly model: string;
    private readonly apiKey: string;
    private readonly endpoint: string;

    constructor(endpoint: string, apiKey: string, assistantId: string, model: string) {
        this.endpoint = endpoint;
        this.apiKey = apiKey;
        this.assistantId = assistantId;
        this.model = model || 'gpt-4o-mini';  

        this.axiosInstance = axios.create({
            baseURL: endpoint,
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });
    }

    public async createThread(): Promise<ThreadsResponse> {
        try {
            const response = await this.axiosInstance.post('/openai/threads?api-version=2024-05-01-preview',{})
            this.logger.debug(response.data)
            // 將響應數據映射到 AzureOpenAiResponse 模型
            return new ThreadsResponse(response.data);
        } catch (error) {
            this.logger.error('Error fetching response from Azure OpenAI:', error);
            throw error;
        }
    }

    public async createMessage(threadId: string, message: string): Promise<CreateMessageResponse> {
        try {
            const response = await this.axiosInstance.post(`/openai/threads/${threadId}/messages?api-version=2024-05-01-preview`, {
                content: message,
                role: 'user',
            });
            // 將響應數據映射到 AzureOpenAiResponse 模型
            return new CreateMessageResponse(response.data);
        } catch (error) {
            this.logger.error('Error fetching response from Azure OpenAI:', error);
            throw error;
        }
    }

    public async getMessages(threadId: string): Promise<Array<MessageData>> {
        try {
            const response = await this.axiosInstance.get(`/openai/threads/${threadId}/messages?api-version=2024-05-01-preview`);
            // 將響應數據映射到 AzureOpenAiResponse 模型
            return new MessageResponse(response.data).data;
        } catch (error) {
            this.logger.error('Error fetching response from Azure OpenAI:', error);
            throw error;
        }
    }


    public async createRun(threadId: string): Promise<RunResponse> {
        try {
            const response = await this.axiosInstance.post(`/openai/threads/${threadId}/runs?api-version=2024-05-01-preview`, {
                "assistant_id": this.assistantId,
                "model": this.model,
                "response_format": "auto",
                "stream": false
            });
            // 將響應數據映射到 AzureOpenAiResponse 模型

            const runResponse = new RunResponse(response.data);
            this.logger.debug('Sent run:', runResponse);
            this.logger.debug(`Run created with id: ${runResponse.id}`);
            let runStatus = runResponse.status;
            while (runStatus === 'queued' || runStatus === 'in_progress') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const resp = await this.axiosInstance.get(`/openai/threads/${threadId}/runs/${runResponse.id}?api-version=2024-05-01-preview`);
                const runStatusResponse = new RunResponse(resp.data);
                runStatus = runStatusResponse.status;
                this.logger.debug(`Current run status: ${runStatus}`);
                this.logger.debug('Sent get run:', runStatusResponse);
            }

            // Get the messages in the thread once the run has completed
            if (runStatus === 'completed') {
                return runResponse
            } else {
                this.logger.debug(`Run status is ${runStatus}, unable to fetch messages.`);
            }
        } catch (error) {
            this.logger.error('Error fetching response from Azure OpenAI:', error);
            throw error;
        }
    }
}