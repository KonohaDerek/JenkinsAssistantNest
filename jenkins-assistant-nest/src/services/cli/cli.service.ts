import { Injectable, Logger } from '@nestjs/common';
import { config } from '../../config';  // 引入配置檔

import { AzureOpenAiService } from '../azure-open-ai/azure-open-ai.service';


@Injectable()
export class CliService {
    private readonly logger = new Logger(CliService.name);
    
    public async run(args: any) {
        // 輸出傳入的參數
        this.logger.debug('Arguments received:', args);

        // 獲取參數
        const exception = args.exception; // 來自短參數 -m 或長參數 --model

        // 進行 API 請求
        try {
            // 建立azure open ai服務
            const azureOpenAiService = new AzureOpenAiService(config.azureOpenAiEndpoint, config.azureOpenAiApiKey, config.azureOpenAiAssistantId, config.azureOpenAiModel);
            // 創建一個新的對話
            const thread = await azureOpenAiService.createThread();
            this.logger.debug('Created thread:', thread);
            // 發送消息
            const message = await azureOpenAiService.createMessage(thread.id, exception);
            this.logger.debug('Sent message:', message);
            // 執行
            const run = await azureOpenAiService.createRun(thread.id);
            this.logger.debug('Created run:', run);
            // 獲取消息
            const messages = await azureOpenAiService.getMessages(thread.id);
            this.logger.debug('Messages:', messages);
            this.logger.debug('Get Content:', messages[0].content[0].text.value);
            const response = messages[0].content[0].text.value || "";
            console.log(response);
        } catch (error) {
            this.logger.error('Error fetching data from API:', error.message);
        }finally{
            this.logger.debug('API request completed.');
            // 命令執行完畢後退出程式
            process.exit(0); // 0 表示正常退出
        }
    }
}