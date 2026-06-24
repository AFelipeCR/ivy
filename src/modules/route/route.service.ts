import { Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RawAxiosRequestHeaders } from 'axios';
import { WebhooksService } from '@ivy/openwa';
import { Session } from '../session/entities/session.entity';

@Injectable()
export class RouteService {
  headers: RawAxiosRequestHeaders;

  constructor(
    @InjectRepository(Route)
    private routeRepository: Repository<Route>,
    private config: ConfigService,
    private webhooksS: WebhooksService
  ) {
    this.headers = {
      "X-API-Key": this.config.get("API_KEY"),
      "Content-Type": "application/json"
    }
  }

  async create(route: CreateRouteDto) {
    const r = new Route();
    const s = new Session();

    s.id = route.sessionId;
    r.name = route.name;
    r.endpoint = route.endpoint;
    r.sessions = [s]
    r.events = route.events;
    const ret = await this.routeRepository.save(r);
    return ret;
  }

  async findBySessionId(sessionId: string) {
    const webhooks = await this.webhooksS.getBySessionId(sessionId);
    const routes = await this.routeRepository.find({
      select: { endpoint: true, name: true, id: true },
      where: { sessions: { id: sessionId } }
    });

    const routesEndpoints = routes.map(r => r.endpoint)

    const serverUrl = `${this.config.get("SERVER_IP")}:${this.config.get("PORT")}`;

    const valid = webhooks.filter(w =>
      w.url.includes(serverUrl)
    ).map(w => {
      const endpoint = w.url.replace(serverUrl, "");
      const isRegistered = routesEndpoints.includes(endpoint)

      let name = "";
      let id: number | string = w.id;

      if (isRegistered) {
        const route = routes.find(r => r.endpoint == endpoint) as Route;
        id = route.id;
        name = route.name;
      }

      return {
        id,
        endpoint,
        events: w.events,
        registered: isRegistered,
        name
      }
    })

    return valid;
  }

  async findById(id: number) {
    const route = await this.routeRepository.findOne({
      select: {
        endpoint: true,
        name: true,
        id: true,
        events: true,
        actions: { 
          command: true,
          id: true,
        }
      },
      relations: {
        actions: true,
      },
      where: { id }
    });

    return route;
  }
}
