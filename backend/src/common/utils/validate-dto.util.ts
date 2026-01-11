import { GraphQLValidationPipe } from '../pipes/graphql-validation.pipe';

/**
 * Helper function to validate a DTO instance
 * @param dto - The DTO instance to validate
 * @param dtoClass - The DTO class (for type checking)
 * @returns The validated DTO instance
 * @throws BadRequestException if validation fails
 */
export async function validateDto<T>(dto: T, dtoClass: new () => T): Promise<T> {
  const pipe = new GraphQLValidationPipe();
  return await pipe.transform(dto, { metatype: dtoClass, type: 'body' });
}

