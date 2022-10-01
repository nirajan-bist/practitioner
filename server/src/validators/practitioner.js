import Joi from "joi";

import validate from "../utils/validate";

const timeRegEx = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

const createPractitionerSchema = Joi.object({
  email: Joi.string().max(100).email().required(),
  fullname: Joi.string().required().label("Full Name"),
  contact: Joi.string().required().label("Contact"),
  dob: Joi.date().label("Date of Birth"),
  imageUrl: Joi.string().label("Image"),
  startTime: Joi.string().pattern(timeRegEx).messages({ "string.pattern.base": "End time must be in HH:MM format" }),
  endTime: Joi.string().pattern(timeRegEx).messages({ "string.pattern.base": "End time must be in HH:MM format" }),
  workingDays: Joi.string(),
});

/**
 * Validates create new practitioner request body.
 */
export function validateCreatePractitioner(req, res, next) {
  return validate(req.body, createPractitionerSchema)
    .then(() => next())
    .catch(next);
}
