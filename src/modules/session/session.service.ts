import { Injectable } from '@nestjs/common';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { RawAxiosRequestHeaders } from 'axios';
import { SessionsService } from '@ivy/openwa';
import { CreateSessionDto } from './dto/create-session.dto';
import { ResSession } from './dto/find-session.dto';

@Injectable()
export class SessionService {
  headers: RawAxiosRequestHeaders;

  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private config:ConfigService,
    private sessionsS:SessionsService
  ){
    this.headers = {
      "X-API-Key": this.config.get("API_KEY"),
      "Content-Type": "application/json"
    }
  }

  async getRegistered() {
    const waSessions = await this.sessionsS.getList();
    const registeredSessions = await this.sessionRepository.find({ select: { id: true, name: true, phone: true }});

    if(Array.isArray(waSessions)){
      const registredIds = registeredSessions.map(s => s.id);

      const notRegistered:ResSession[] = [];
      const registered:ResSession[] = registeredSessions.map(s => ({
          id: s.id,
          name: s.name,
          phone: s.phone
      }));

      waSessions.forEach(s => {
        if(!registredIds.includes(s.id)){
          notRegistered.push({
            id: s.id,
            name: s.name,
            phone: s.phone
          });
        }
      });

      return {
        registered,
        notRegistered
      }
    }

    return {};
  }

  async create(session:CreateSessionDto) {
    const s = new Session();
    s.id = session.id;
    s.name = session.name;
    s.description = session.description;
    s.phone = session.phone;
    const r = await this.sessionRepository.save(s);
    return r;
  }

  findOne(id: string) {
    return this.sessionRepository.findOneBy({ id });
  }

  findOneWA(id: string) {
    return this.sessionsS.getById(id);
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
