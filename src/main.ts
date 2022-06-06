import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api-notify')
  
  if (process.env.NODE_ENV !== "production") {
    const options = new DocumentBuilder()
      .setTitle('ZA notification')
      .setDescription('Zummit Africa API hub email & text notification')
      .setVersion('1.0')
      .addBearerAuth()
      .build()
    
    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api-notify', app, document)
  }
  await app.listen(3000);
}
bootstrap();
