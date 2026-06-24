import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { HttpModule } from '@nestjs/axios';
import { RouteService } from '../route/route.service';
import { Route } from '../route/entities/route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Session, 
      Route
    ]),
    HttpModule
  ],
  controllers: [SessionController],
  providers: [
    SessionService,
    RouteService
  ],
})
export class SessionModule {}
