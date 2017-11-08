import Debug from 'debug';
import DomainSchema from 'domain-schema';

const debug = Debug('domain-graphql');

export default class {
  constructor() {}

  public _generateField(typeName, key, value) {
    let result = `    ${key}: `;
    switch (value.type.name) {
      case 'Boolean':
        result += 'Boolean';
        break;
      case 'ID':
        result += 'ID';
        break;
      case 'Integer':
        result += 'Int';
        break;
      case 'String':
        result += 'String';
        break;
      default:
        if (value.isSchema) {
          result += value.type.name;
        } else {
          throw new Error(`Don't know how to handle type ${value.type.name} of ${typeName}.${key}`);
        }
    }

    if (!value.optional) {
      result += '!';
    }

    return result;
  }

  public generateTypes(schema) {
    const domainSchema = new DomainSchema(schema);

    const results = [];
    let result = `type ${domainSchema.name} {\n`;
    for (const key of domainSchema.keys()) {
      const value = domainSchema.values[key];
      if (!value.private) {
        result += this._generateField(domainSchema.name, key, value) + '\n';
        if (value.isSchema) {
          results.push(this.generateTypes(value.type));
        }
      }
    }

    result += '}';
    results.push(result);

    debug(results.join('\n'));

    return results.join('\n');
  }
}
