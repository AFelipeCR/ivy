import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { RouteService } from '../route/route.service';
import { Action } from './entities/action.entity';
import { ExtFunction } from '../extension/entities/ext-function.entity';
import { ActionFunction } from './entities/action-function.entity';
import { ActionService } from './action.service';
import { ActionController } from './action.controller';
import { Route } from '../route/entities/route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Action, 
      ExtFunction,
      ActionFunction,
      Route
    ]),
    HttpModule
  ],
  controllers: [ActionController],
  providers: [
    ActionService,
    RouteService
  ],
})
export class ActionModule {}
