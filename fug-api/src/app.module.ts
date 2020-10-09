import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UrlPair } from './entities/url-pair.entity';
import { UrlPairService } from './services/url-pair/url-pair.service';
import { UrlGeneratorService } from './services/url-generator/url-generator.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UrlPair]),
  ],
  controllers: [AppController],
  providers: [UrlPairService, UrlGeneratorService],
})
export class AppModule {}
