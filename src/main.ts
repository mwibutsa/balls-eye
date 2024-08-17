import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ignores fields that are not defined in the dto
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Balls Eye')
    .setDescription('The Balls eye API description')
    .setVersion('1.0')
    .addTag('Match of the day')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}
bootstrap();
