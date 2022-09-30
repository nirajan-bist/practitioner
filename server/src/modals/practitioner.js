import db from "../db";

const TABLE_NAME = "practitioner";

const qb = () => db(TABLE_NAME);

export function fetchAll() {
  return qb().select("*");
}

export function fetchById(id) {
  return qb().select("*").where("id", id);
}

export function insert(data) {
  return qb().returning("*").insert(data);
}

export function deleteById(id) {
  return qb().returning("*").del().where("id", id);
}

export function updateById(id, data) {
  return qb().returning("*").where("id", id).update(data);
}
