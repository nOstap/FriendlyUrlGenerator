import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UrlPair } from './entities/url-pair.entity';
import { UrlPairService } from './services/url-pair/url-pair.service';
import { UrlGeneratorService } from './services/url-generator/url-generator.service';
import { dictionaryProviders } from './providers/dictionary.providers';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([UrlPair]),
  ],
  controllers: [AppController],
  providers: [
    UrlPairService,
    UrlGeneratorService,
    ...dictionaryProviders,
  ],
})
export class AppModule { }
