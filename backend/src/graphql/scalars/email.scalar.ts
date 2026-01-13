import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';

@Scalar('Email', () => String)
export class EmailScalar implements CustomScalar<string, string> {
  description = 'Email scalar type (validates email format)';

  private emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  parseValue(value: string): string {
    if (typeof value !== 'string') {
      throw new GraphQLError(`Value is not a string: ${value}`);
    }
    
    if (!this.emailRegex.test(value)) {
      throw new GraphQLError(`Value is not a valid email: ${value}`);
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
    
    if (!this.emailRegex.test(ast.value)) {
      throw new GraphQLError(`Value is not a valid email: ${ast.value}`);
    }
    
    return ast.value;
  }
}

