// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: "192.168.0.249",
      database: "prodoctor",
      user: "postgres",
      password: "postgres",
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/database/migrations`
    }
  },
};
