import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';

@Controller('routes')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post()
  create(@Body() cSDto: CreateRouteDto) {
    return this.routeService.create(cSDto);
  }

  @Get(":id")
  findById(@Param("id") id:string) {
    return this.routeService.findById(+id);
  }
}
