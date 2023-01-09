import { ObjectSchema } from 'joi';

import ValidationError from '../errors/validation.error';
 
class ValidationService<T> {
  private schema: ObjectSchema;

  private statusCodes: Record<string, number>;

  constructor(schema: ObjectSchema, statusCodes: Record<string, number>) {
    this.schema = schema;
    this.statusCodes = statusCodes;
  }

  public validate = (data: T) => {
    const { error } = this.schema.validate(data);
    if (error) {
      const { type } = error.details[0];
      
      const statusCode = this.statusCodes[type];
      throw new ValidationError(error.message, statusCode);
    }
  };
}

export default ValidationService;
