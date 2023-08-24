import dotenv from "dotenv-safe";

dotenv.config();

const defautConfig = {
  apiUrl: process.env.PUBLIC_URL_API_URL || "http://localhost:1337",
};

export default defautConfig;
