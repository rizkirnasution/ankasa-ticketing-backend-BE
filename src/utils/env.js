require("dotenv").config();

module.exports = {
  APP_NAME: process.env.APP_NAME,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  API_URL: process.env.API_URL,
  CLIENT_URL: process.env.CLIENT_URL,

  // database
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGDATABASE: process.env.PGDATABASE,
  PGPORT: process.env.PGPORT,
  DATABASE_URL : process.env.DATABASE_URL,

  // jwt
  JWT_SECRET: process.env.JWT_SECRET,

  // google
  EMAIL_FROM: process.env.EMAIL_FROM,
  EMAIL_USER: process.env.EMAIL_USER,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  // google activation-mail
  GMAIL_REFRESH_TOKEN: process.env.GMAIL_REFRESH_TOKEN,
  // google drive cloud upload
  DRIVE_REFRESH_TOKEN: process.env.DRIVE_REFRESH_TOKEN,
};
