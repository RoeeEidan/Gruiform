
const { Client } = require('pg');
const knex = require('knex')({ client: 'pg' }); 'ec2-user@ec2-34-208-185-237.us-west-2.compute.amazonaws.com/5432'
const Weather = require('./Weather.js');

const client = new Client();
client.connect();

class Sql {
    constructor() {
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
    }

    insert(data) {
        const weather = new Weather(data);
        if (weather.err) { throw `err` }
        const query = knex('weathers').insert(weather).returning('*').toString();
        return client.query(query)
            .then(data => data.rows[0].id)
            .catch(e => e)
    }

    delete(data) {
        const weather = new Weather(data);
        if (weather.err) { throw `err` };

        const query = knex('weathers').where(weather).del().returning('*').toString();
        return client.query(query)
            .then(res => true)
            .catch(e => false)
    }

}

const sql = new Sql();

module.exports = sql;