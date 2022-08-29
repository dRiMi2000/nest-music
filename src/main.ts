

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function start() {
  try {
    const app = await NestFactory.create(AppModule);
    app.enableCors() //чтобы отправлять запросы с браузера
    await app.listen(3000, () => console.log(`server start on PORT ${3000}`));
  } catch (e) {
    console.log(e)
  }
}
start();
