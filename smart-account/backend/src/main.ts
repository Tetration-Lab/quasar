import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({ origin: '*' })
  app.useBodyParser('json', { limit: '1mb' })

  const configService = app.get(ConfigService)
  const port = configService.get<number>('port') || 3000
  await app.listen(port, '0.0.0.0')
}
bootstrap();
