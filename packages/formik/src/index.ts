import DomainSchema from '@domain-schema/core';
import DomainValidator from '@domain-schema/validation';

export default class DomainReactForms {
  constructor(private schema: DomainSchema) {}

  public validate(formValues: any) {
    return DomainValidator.validate(formValues, this.schema);
  }

  public static setValidationMessages(messages) {
    DomainValidator.setValidationMessages(messages);
  }
}
