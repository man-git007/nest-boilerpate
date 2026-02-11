// src/common/pipes/validation.pipe.ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata) {
    if (!metatype || this.isNativeType(metatype)) {
      return value;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const object = plainToInstance(metatype, value);
    const errors = await validate(object as object);

    if (errors.length > 0) {
      const messages = errors.map((error) => {
        const constraints = error.constraints || {};
        return Object.values(constraints).join(', ');
      });
      throw new BadRequestException(messages);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return object;
  }

  private isNativeType(metatype: any): boolean {
    return [String, Boolean, Number, Array, Object].includes(metatype);
  }
}
