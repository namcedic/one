import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs/swagger.config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  swaggerConfig(app);
  await app.listen(3000);
}
bootstrap();
