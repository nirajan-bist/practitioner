import db from "../db";

const TABLE_NAME = "user";

const qb = () => db(TABLE_NAME);

/**
 * Fetch a user by id.
 * @param {Number} id
 * @returns {Object} object[]
 */
export async function fetchById(id) {
  const [result] = await qb().select("*").where("id", id);
  return result;
}
/**
 * Fetch a user by email.
 * @param {String} email
 * @returns {Object} object
 */
export async function fetchByEmail(email) {
  const [result] = await qb().select("id", "email", "password").where("email", email);
  return result;
}
/**
 * Inserts a new user.
 * @param {Object} data
 * @returns {Object} object
 */
export async function insert(data) {
  const [result] = await qb().insert(data, ["id", "email", "password"]);
  return result;
}
