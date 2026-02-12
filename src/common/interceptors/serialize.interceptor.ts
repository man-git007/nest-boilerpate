import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as classTransformer from 'class-transformer';

export function Serialize<T>(dto: classTransformer.ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * SerializeInterceptor is a Nest interceptor that is responsible for serializing the output of
 * controllers. It uses the class-transformer library to transform the data into an instance
 * of the specified DTO class.
 *
 * @class SerializeInterceptor
 * @implements {NestInterceptor<unknown, T>}
 */
@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor<unknown, T> {
  constructor(private readonly dto: classTransformer.ClassConstructor<T>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<T> {
    return next.handle().pipe(
      map((data: unknown) => {
        return classTransformer.plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
          enableCircularCheck: true,
          enableImplicitConversion: true,
        });
      }),
    );
  }
}
