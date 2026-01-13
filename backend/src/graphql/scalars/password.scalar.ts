import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode, GraphQLError } from 'graphql';

@Scalar('Password', () => String)
export class PasswordScalar implements CustomScalar<string, string> {
  description = 'Password scalar type (validates minimum length of 6 characters)';

  private minLength = 6;

  parseValue(value: string): string {
    if (typeof value !== 'string') {
      throw new GraphQLError(`Value is not a string: ${value}`);
    }
    
    if (value.length < this.minLength) {
      throw new GraphQLError(`Password must be at least ${this.minLength} characters long, got: ${value.length}`);
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
    
    if (ast.value.length < this.minLength) {
      throw new GraphQLError(`Password must be at least ${this.minLength} characters long`);
    }
    
    return ast.value;
  }
}

