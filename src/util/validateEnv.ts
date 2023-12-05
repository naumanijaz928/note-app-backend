import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port(),
  DB_URL: str(),
  SESSION_SECRET: str(),
});
