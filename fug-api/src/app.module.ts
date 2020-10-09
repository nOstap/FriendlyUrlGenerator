import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UrlPair } from './entities/url-pair.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UrlPair]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
