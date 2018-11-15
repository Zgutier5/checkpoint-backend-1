const express = require('express')
const parser = require('body-parser')
const fs = require('fs')
const fetch = require('node-fetch')
const mon= require('mongoose')
mon.Promise = global.Promise;
mon.connect("mongodb://joeblow:zeke33@ds261247.mlab.com:61247/checkpoint_1");


// const orders = require("./orders");
// const messages = require("./messages");
// const tasks = require("./tasks");
const app = express()

fs.readFile('server/data.csv', 'utf8', (err, data) =>{
    if (err) throw err;
    const dataSent = data.split('\n')

    const valueArr = dataSent[1].split(',')
        app.get('/newComments', (req, res) =>{
            res.send(valueArr[0])
        })
        app.get('/newTasks', (req, res) =>{
            res.send(valueArr[1])
        })
        app.get('/newOrders', (req, res) =>{
            res.send(valueArr[2])
        })
        app.get('/tickets', (req, res) =>{
            res.send(valueArr[3])
        })
  });

// module.exports = mon.model(route,schema)
let OrderRoutes  = require("./routes/orderroutes");
let MessageRoutes  = require("./routes/messageroutes");
let TaskRoutes  = require("./routes/taskroutes");

app.use(parser.json())
//Input routes here
app.use(OrderRoutes);
app.use(MessageRoutes);
app.use(TaskRoutes);




fetch('https://randomfox.ca/floof/')
.then(response => response.json())
.then(json => {
    app.get('/foxes', (req, res)=>{
    res.json(json.image)
})
})


app.listen(3001, () => console.log('Listening on port 3001!'))