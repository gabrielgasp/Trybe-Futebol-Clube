import Joi from 'joi';
import { TBodyValidator } from '../typescript/types';

const missingFieldsError = '401|All fields must be filled';

const login = Joi.object({
  email: Joi.string().required().messages({
    'string.base': '422|Email must be a string',
    'string.empty': missingFieldsError,
    'any.required': missingFieldsError,
  }),
  password: Joi.string().required().messages({
    'string.base': '422|Password must be a string',
    'string.empty': missingFieldsError,
    'any.required': missingFieldsError,
  }),
});

export const loginBodyValidator: TBodyValidator = (body: unknown) => {
  const { error } = login.validate(body);
  if (error) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }
};
