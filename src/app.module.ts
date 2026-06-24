import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionModule } from './modules/session/session.module';
import { Session } from './modules/session/entities/session.entity';
import { Route } from './modules/route/entities/route.entity';
import { validationSchema } from './env.validation';
import { OpenWaModule } from '@ivy/openwa';
import { RouteModule } from './modules/route/route.module';
import { ExtensionsModule } from './modules/extension/extension.module';
import { Extension } from './modules/extension/entities/extension.entity';
import { ExtFunction } from './modules/extension/entities/ext-function.entity';
import { Action } from './modules/action/entities/action.entity';
import { ActionFunction } from './modules/action/entities/action-function.entity';
import { ActionModule } from './modules/action/action.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema,
    }),
    OpenWaModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        apiKey: config.get<string>("API_KEY") || '',
        whatsappUrl: config.get<string>("WHATSAPP_URL") || '',
      })
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './data/ivy.db',
      entities: [
        Session, Route,
        Action, ActionFunction,
        Extension, ExtFunction
      ],
      synchronize: true,
    }),
    SessionModule,
    RouteModule, 
    ActionModule,
    ExtensionsModule.forRoot([
    ]),
  ],
})
export class AppModule { }
