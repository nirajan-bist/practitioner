/**
 * Validate data with joi schema.
 * @param {Object}  data
 * @param {Object}  schema
 * @returns {Promise}
 */
export default async function validate(data, schema) {
  try {
    const value = await schema.validateAsync(data, { abortEarly: false });

    return value;
  } catch (err) {
    throw err;
  }
}
