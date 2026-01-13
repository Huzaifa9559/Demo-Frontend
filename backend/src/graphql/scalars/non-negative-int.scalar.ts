import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';

@Scalar('NonNegativeInt', () => Number)
export class NonNegativeIntScalar implements CustomScalar<number, number> {
  description = 'Non-negative integer scalar type (must be >= 0)';

  parseValue(value: number): number {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      throw new GraphQLError(`Value is not an integer: ${value}`);
    }
    
    if (value < 0) {
      throw new GraphQLError(`Value must be non-negative (>= 0), got: ${value}`);
    }
    
    return value;
  }

  serialize(value: number): number {
    return value;
  }

  parseLiteral(ast: ValueNode): number {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(`Can only parse integer values, got: ${ast.kind}`);
    }
    
    const value = parseInt(ast.value, 10);
    
    if (isNaN(value)) {
      throw new GraphQLError(`Value is not a valid integer: ${ast.value}`);
    }
    
    if (value < 0) {
      throw new GraphQLError(`Value must be non-negative (>= 0), got: ${value}`);
    }
    
    return value;
  }
}

