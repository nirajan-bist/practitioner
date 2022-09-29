import db from "../db";

const TABLE_NAME = "user";

const qb = () => db(TABLE_NAME);

export function fetchById(id) {
  return qb().select("*").where("id", id);
}
export function fetchByEmailAndPassword(email, password) {
  return qb()
    .select("id", "email", "created_at")
    .where("email", email)
    .where("password", password)
    .then(([result]) => result);
}

export function insert(data) {
  return qb()
    .insert(data, ["id", "email"])
    .then(([result]) => result);
}
