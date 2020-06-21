module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'portalhrzntdev'
        },
        migrations: {
            directory: './src/database/migrations'
        },
        useNullAsDefault: true
    }
}