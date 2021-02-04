module.exports = {
    environment: process.env.NODE_ENV || "queit_development",
    port: process.env.PORT || 8080,
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
    },
    sessionConfig: {
      secret: process.env.SESSION_SECRET,
      expiresIn: process.env.SESSION_EXPIRES_IN,
    },
  };