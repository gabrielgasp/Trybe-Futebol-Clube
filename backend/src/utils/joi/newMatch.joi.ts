import Joi from 'joi';

export const newMatch = Joi.object({
  homeTeam: Joi.number().positive().required().messages({
    'number.base': '422|Home Team must be a positive integer',
    'number.positive': '422|Home Team must be a positive integer',
    'any.required': '400|Home Team must be provided',
  }),
  awayTeam: Joi.number().positive().required().messages({
    'number.base': '422|Away Team must be a positive integer',
    'number.positive': '422|Away Team must be a positive integer',
    'any.required': '400|Away Team must be provided',
  }),
  homeTeamGoals: Joi.number().integer().min(0).required()
    .messages({
      'number.base': '422|Home Team Goals must be an integer',
      'number.min': '422|Home Team Goals can not be negative',
      'any.required': '400|Home Team Goals must be provided',
    }),
  awayTeamGoals: Joi.number().integer().min(0).required()
    .messages({
      'number.base': '422|Away Team Goals must be an integer',
      'number.min': '422|Away Team Goals can not be negative',
      'any.required': '400|Away Team Goals must be provided',
    }),
  inProgress: Joi.boolean().valid(true).required().messages({
    'any.required': '400|In Progress must be provided as true',
    'any.only': '422|In Progress must be provided as true',
  }),
});
