// src/common/middleware/validation.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IndexMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    this.defaultMiddleware(req);

    next();
  }

  private defaultMiddleware(req: Request): void {
    console.log(req.query);
  }
}
