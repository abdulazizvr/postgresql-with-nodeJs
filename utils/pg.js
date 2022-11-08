const {Pool} = require('pg');

const pool = new Pool({
    user:"postgres",
    password:'checkhack__01',
    database:'salon',
    host:'localhost',   
    port:'5000'
})
async function fetchAll ( query, ...params){
    let client = await pool.connect()
    let {rows} = await client.query(query , params.length? params:null)
    return rows;
}
async function fetch ( query, ...params){
    console.log(query , params.length? params:null);
    let client = await pool.connect()
    let {rows:[value]} = await client.query(query , params.length? params : null)
    return value;
}
module.exports = {fetch, fetchAll}
