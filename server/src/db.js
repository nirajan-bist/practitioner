import knex from "knex";
import dbConfig from "./knexfile";

// Configure knex with db params set in knexfile.
export default knex(dbConfig);
