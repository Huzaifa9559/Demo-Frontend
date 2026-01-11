import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

/**
 * GraphQL Validation Pipe
 * Validates DTOs using class-validator decorators
 * Works with GraphQL inputs that are mapped to DTOs
 */
@Injectable()
export class GraphQLValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // Skip validation if no metatype or if it's a native type
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // Transform plain object to class instance
    const object = plainToInstance(metatype, value);
    
    // Validate the object
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        constraints: error.constraints || {},
        messages: error.constraints ? Object.values(error.constraints) : [],
      }));

      throw new BadRequestException({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

