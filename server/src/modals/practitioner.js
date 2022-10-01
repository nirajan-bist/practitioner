import db from "../db";

const TABLE_NAME = "practitioner";

const qb = () => db(TABLE_NAME);

/**
 * Fetches all practitioners.
 * @returns {Promise} [object]
 */
export function fetchAll() {
  return qb().select("*");
}
/**
 * Fetches a practitioner by id.
 * @param {Number} id
 * @returns {Promise}
 */
export function fetchById(id) {
  return qb().select("*").where("id", id);
}
/**
 * Inserts a new practitioner.
 * @param {Object} data
 * @returns {Promise}
 */
export function insert(data) {
  return qb().returning("*").insert(data);
}
/**
 * Deletes a practitioner by id.
 * @param {Number} id
 * @returns {Promise}
 */
export function deleteById(id) {
  return qb().returning("*").del().where("id", id);
}
/**
 * Updates a practitioner by id.
 * @param {Number} id
 * @param {Object} data
 * @returns {Promise}
 */
export function updateById(id, data) {
  return qb().returning("*").where("id", id).update(data);
}
