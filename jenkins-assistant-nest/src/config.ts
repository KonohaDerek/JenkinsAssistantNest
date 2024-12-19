// src/config.ts
import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
    azureOpenAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT || 'https://default.azure-openai.com',
    azureOpenAiApiKey: process.env.AZURE_OPENAI_API_KEY || 'default_azure_openai_api_key',
    azureOpenAiAssistantId: process.env.AZURE_OPENAI_ASSISTANT_ID || 'default_azure_openai_assistant_id',
    azureOpenAiModel: process.env.AZURE_OPENAI_MODEL || 'gpt-4o-mini',
    azureOpenAiApiVersion: process.env.AZURE_OPENAI_API_VERSION || '2024-07-01-preview',
};