// src/common/middleware/validation.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Clean and validate request data
    this.sanitizeReqData(req);

    next();
  }

  private sanitizeReqData(req: Request): void {
    console.log(req.query);
  }
}
