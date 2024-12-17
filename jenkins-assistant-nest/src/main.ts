import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliService } from './services/cli/cli.service';
import * as yargs from 'yargs';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, {
    logger: false, // 關閉默認的日誌
  });
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    app.enableShutdownHooks();
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']); // 在開發中啟用所有日誌
  } else {
    app.useLogger(['error', 'warn']); // 在生產中僅保留錯誤和警告
  }
  
  const cliService = app.get(CliService);

  // 設置 yargs 參數解析
  const argv = yargs
    .usage('Usage: $0 -e [exception]')
    .option('exception', {
      alias: 'e',
      describe: 'Exception message',
      type: 'string',
      demandOption: true, // 必填
    })
    .help() // 添加幫助信息
    .alias('help', 'h')
    .argv;
  
  // 傳遞參數給 cliService
  await cliService.run(argv);

  await app.close();
}
bootstrap();