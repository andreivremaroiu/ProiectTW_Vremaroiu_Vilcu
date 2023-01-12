const { Pool } = require('pg');

const pg_uri = process.env.pg_uri;

const pool = new Pool({
    connectionString: pg_uri
})

//Exportam un obiect cu proprietatea query
//este o functie care apeleaza pool.query
//este necesara in controllere pentru a fi punctul de acces catre baza de date

module.exports = {
    query: (text, params, callback) => {
        console.log('-->query', text);
        return pool.query(text, params, callback);
    }
}