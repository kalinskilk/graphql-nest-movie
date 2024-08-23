import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as graphql from '@nestjs/graphql';
import graphqlFields from 'graphql-fields';

export class FieldsAndRelations<T> {
  fields: (keyof T)[];
  relations?: { alias: string; relation: string }[];
}

export const FieldsAndRelationsGql = createParamDecorator(
  async (
    alias: string,
    context: ExecutionContext,
  ): Promise<{
    fields: string[];
    relations?: { alias: string; relation: string }[];
  }> => {
    const ctx = graphql.GqlExecutionContext.create(context);

    const info = ctx.getInfo();

    const fields = graphqlFields(info);

    const aliases = getAliases(fields, alias);

    return {
      fields: Object.keys(aliases),
      relations: getRelations(fields, alias),
    };
  },
);

function getAliases(
  obj: Record<string, any>,
  parentKey: string = '',
): Record<string, string> {
  let result: Record<string, string> = {};

  for (const key in obj) {
    if (Object.keys(obj[key]).length > 0) {
      result = {
        ...result,
        ...getAliases(obj[key], key),
      };
    } else {
      const alias = parentKey ? `${parentKey}.${key}` : key;
      result[alias] = alias;
    }
  }

  return result;
}

function getRelations(obj: Record<string, any>, parentKey: string = '') {
  const result: { alias: string; relation: string }[] = [];

  for (const key in obj) {
    if (Object.keys(obj[key]).length > 0) {
      result.push({
        alias: key,
        relation: parentKey ? `${parentKey}.${key}` : key,
      });
      result.push(...getRelations(obj[key], key));
    }
  }

  return result;
}
