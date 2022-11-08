const express = require('express');
const Userrouter = require('../routes/user.routes');
const Carrouter = require('../routes/cars.routes');
const PORT = 3000
const app =  express()

app.use(express.json())
app.use(Userrouter)
app.use(Carrouter)


app.listen(PORT, ()=>console.log('Run'))