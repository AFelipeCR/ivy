import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  app.setGlobalPrefix("api");

  await app.listen(process.env.PORT ?? 3000, () => {
    console.log(`Listening on http://localhost:${port}`);
    console.log(`Listening on ${process.env.SERVER_IP}:${port}`);
  });

}
bootstrap();
