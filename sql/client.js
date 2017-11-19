
const { Client } = require('pg');
const pgtools = require('pgtools');
const knex = require('knex')({ client: 'pg' });

const client = new Client();

const dbConfig = {
    user: 'roeeeidan',
    password: '85858585',
    port: 5432,
    host: 'localhost'
};

// Creating the database if it doesnt exist.
pgtools.createdb(dbConfig, 'roeeeidan', () => {

    client.connect();

    // Checking if thers our weathers table exists, and if it doesnt creat it.
    const query = knex.schema.createTableIfNotExists('weathers', function (table) {
        table.increments('id').primary();
        table.text('city');
        table.text('wind');
        table.text('descrip');
        table.text('img');
        table.float('temp');
    }).toString();

    client.query(query)
        .catch(e => e)
})

module.exports = client;
