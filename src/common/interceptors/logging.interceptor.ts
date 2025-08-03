import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const now = Date.now();

    console.log({
      method: request.method,
      url: request.url,
      ip: request.ip,
      timestamp: new Date().toISOString(),
    });

    return next.handle().pipe(
      tap(() => {
        console.log({
          method: request.method,
          url: request.url,
          duration: `${Date.now() - now}ms`,
        });
      }),
    );
  }
}