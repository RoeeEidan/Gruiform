
const { Client } = require('pg');
const knex = require('knex')({ client: 'pg' });
const Weather = require('./Weather.js');

const client = new Client();
client.connect();


class Sql {

    insert(data) {
        const weather = new Weather(data);
        if (weather.err) { throw `err` }
        const query = knex('Weathers').insert(weather).returning('*').toString();
        return client.query(query)
            .then(data => data.rows[0].id)
            .catch(e => e)
    }

    delete(data) {
        const weather = new Weather(data);
        if (weather.err) { throw `err` };

        const query = knex('Weathers').where(weather).del().returning('*').toString();
        return client.query(query)
            .then(res => true)
            .catch(e => false)
    }

}

const sql = new Sql();

module.exports = sql;





// knex({ z: 'table', b: 'table' })
// .select({
//   aTitle: 'city',
// })
// .whereRaw('?? = ??', ['a.column_1', 'b.column_2'])

