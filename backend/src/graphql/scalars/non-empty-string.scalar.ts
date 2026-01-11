import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';

@Scalar('NonEmptyString', () => String)
export class NonEmptyStringScalar implements CustomScalar<string, string> {
  description = 'Non-empty string scalar type (validates string is not empty or whitespace)';

  parseValue(value: string): string {
    if (typeof value !== 'string') {
      throw new GraphQLError(`Value is not a string: ${value}`);
    }
    
    if (value.trim().length === 0) {
      throw new GraphQLError(`Value cannot be empty or whitespace`);
    }
    
    return value;
  }

  serialize(value: string): string {
    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Can only parse string values, got: ${ast.kind}`);
    }
    
    if (ast.value.trim().length === 0) {
      throw new GraphQLError(`Value cannot be empty or whitespace`);
    }
    
    return ast.value;
  }
}

