import { Pool } from "pg";

export const dataBase = new Pool({
  user: "hernan",
  host: "db-postgres.ccx2yy4gq55k.us-east-1.rds.amazonaws.com",
  database: "postgres",
  password: "hchapid53",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});
