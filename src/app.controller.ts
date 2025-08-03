import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { MongooseHealthIndicator } from '@nestjs/terminus';


@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: MongooseHealthIndicator,
    private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}
