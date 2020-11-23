const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { request , response } = require('express');

const app = express();

app.use(express.json());

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Credentials", "true");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS,HEAD, PATCH");
    next();
});

app.use(routes);

app.listen(3333, () =>{
    console.log('Server is running');
});