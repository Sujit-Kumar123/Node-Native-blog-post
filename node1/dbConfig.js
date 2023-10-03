const pgp =require('pg-promise')();
const db=pgp({
    host:'localhost',
    port:'5432',
    database:'nodeblogapp',
    user:'blogpost',
    password:'root',
});
module.exports=db;