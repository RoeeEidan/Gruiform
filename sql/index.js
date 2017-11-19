const knex = require('knex')({ client: 'pg' });
const Weather = require('./Weather.js');
const client = require('./client.js');

class Sql {

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