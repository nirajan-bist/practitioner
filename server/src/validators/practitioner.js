import Joi from "joi";

import validate from "../utils/validate";

const timeRegEx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9]$)?/;

const createPractitionerSchema = Joi.object({
  email: Joi.string().max(100).email().label("Email").required(),
  fullname: Joi.string().required().label("Full Name"),
  contact: Joi.string().required().label("Contact"),
  dob: Joi.date().label("Date of Birth"),
  imageUrl: Joi.string().label("Image URL"),
  startTime: Joi.string()
    .label("Start TIme")
    .pattern(timeRegEx)
    .messages({ "string.pattern.base": "Start time must be in valid HH:MM format" }),
  endTime: Joi.string()
    .label("End Time")
    .pattern(timeRegEx)
    .messages({ "string.pattern.base": "End time must be in valid HH:MM format" }),
  workingDays: Joi.string().label("Working Days"),
});

const updatePractitionerSchema = Joi.object({
  email: Joi.string().max(100).email().label("Email"),
  fullname: Joi.string().label("Full Name"),
  contact: Joi.string().label("Contact"),
  dob: Joi.date().label("Date of Birth"),
  imageUrl: Joi.string().label("Image URL"),
  startTime: Joi.string()
    .label("Start TIme")
    .pattern(timeRegEx)
    .messages({ "string.pattern.base": "Start time must be in valid HH:MM format" }),
  endTime: Joi.string()
    .label("End Time")
    .pattern(timeRegEx)
    .messages({ "string.pattern.base": "End time must be in valid HH:MM format" }),
  workingDays: Joi.string().label("Working Days"),
});

/**
 * Validates request body for creating new practitioner.
 */
export function validateCreatePractitioner(req, res, next) {
  return validate(req.body, createPractitionerSchema)
    .then(() => next())
    .catch(next);
}
/**
 * Validates request body for updating existing practitioner.
 */
export function validateUpdatePractitioner(req, res, next) {
  return validate(req.body, updatePractitionerSchema)
    .then(() => next())
    .catch(next);
}
