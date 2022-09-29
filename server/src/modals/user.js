import db from "../db";

const userTable = db("user");

export function fetchAll() {
  return userTable.select("id", "email", "createdAt");
}
