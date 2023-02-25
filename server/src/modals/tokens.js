import db from "../db";

const TABLE_NAME = "user_tokens";

const qb = () => db(TABLE_NAME);

/**
 * Fetch a user by id.
 * @param {Number} id
 * @returns {Object} object[]
 */
export async function fetchByUserActiveToken(userId, token) {
  const [result] = await qb().select("*").whereRaw("user_id = ? and token =? and is_active = true", [userId, token]);
  return result;
}
/**
 * Fetch a user by email.
 * @param {String} email
 * @returns {Object} object
 */
export async function invalidateToken(userId) {
  const result = await qb().update({ isActive: false }).where("user_id", userId);
  return result;
}
/**
 * Inserts a new user.
 * @param {Object} data
 * @returns {Object} object
 */
export async function insert(data) {
  const result = await qb().insert(data);
  return result;
}
