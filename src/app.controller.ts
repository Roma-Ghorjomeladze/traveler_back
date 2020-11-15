import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Request} from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('me')
  getHello(@Request() req): string {
    return req.user;
  }
}
