import { applyDecorators, HttpStatus, Type } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

interface ApiSuccessResponseOptions {
  status?: HttpStatus;
  description?: string;
  isArray?: boolean;
  isPaginated?: boolean;
  examples?: Record<string, { summary: string; value: any }>;
}

export const ApiSuccessResponse = <T extends Type<any>>(
  model: T | T[] | null = null,
  options: ApiSuccessResponseOptions | string = {},
) => {
  const opts: ApiSuccessResponseOptions =
    typeof options === 'string' ? { description: options } : options;

  const statusCode = opts.status || HttpStatus.OK;

  // Determine the Data Schema
  let dataSchema: any;

  if (!model) {
    // Case: No data returned
    dataSchema = { type: 'object', nullable: true, example: null };
  } else if (Array.isArray(model)) {
    // Case: Multiple Models (Union/Polymorphic)
    dataSchema = {
      anyOf: model.map((m) => ({
        title: m.name,
        $ref: getSchemaPath(m),
      })),
    };
  } else if (opts.isArray) {
    // Case: Simple Array
    dataSchema = {
      type: 'array',
      items: { $ref: getSchemaPath(model) },
    };
  } else {
    // Case: Single Object
    dataSchema = { $ref: getSchemaPath(model) };
  }

  // Manage Extra Models for Swagger to track
  const extraModels: Type<any>[] = [];
  if (model) {
    if (Array.isArray(model)) {
      extraModels.push(...model);
    } else {
      extraModels.push(model);
    }
  }

  return applyDecorators(
    ...(extraModels.length > 0 ? [ApiExtraModels(...extraModels)] : []),
    ApiResponse({
      status: statusCode,
      description: opts.description || 'Success',
      schema: {
        properties: {
          status: { type: 'boolean', example: true },
          statusCode: { type: 'number', example: statusCode },
          message: { type: 'string', example: opts.description || 'Success' },
          timestamp: { type: 'string', format: 'date-time' },
          data: dataSchema,
        },
      },
      ...(opts.examples && { examples: opts.examples }),
    }),
  );
};
