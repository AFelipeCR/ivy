import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Session } from '../session/entities/session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route, Session]),
    HttpModule
  ],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
