import { cleanEnv, str, num } from "envalid";

// Make it. Your life to easy.
const Env = cleanEnv(process.env, {
    PORT: num(),
    JWT_AUTH_SECRET: str(),
    DATABASE_MONGO_URI: str()
});

export default Env;