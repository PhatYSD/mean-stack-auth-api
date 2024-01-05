import { cleanEnv, str, num } from "envalid";

const Env = cleanEnv(process.env, {
    APP_PORT: num(),
    JWT_AUTH_SECRET: str(),
    DATABASE_MONGO_URI: str()
});

export default Env;