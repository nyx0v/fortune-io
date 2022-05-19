const express = require('express')
const app = express()
const mongoose = require("mongoose")
const path = require('path')
const file_upload = require("express-fileupload");


require('dotenv').config({ path: path.resolve(__dirname, './.env') }); //use the .env in the root of server directory

console.log(process.env);

mongoose.connect(process.env.MONGODB_URI)


const _port = process.env.PORT

const backend_root = "/api"

//cors
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,PATCH,DELETE,OPTIONS"
    );
    next();
  });


app.use(express.json())
app.use(file_upload());

const users = require('./routes/users')
const projects = require('./routes/projects')
const analyses = require('./routes/analyses')
const auth = require('./routes/auth')
const upload = require('./routes/upload')
const download = require('./routes/download')
const statistics  =require('./routes/statistics')

app.use(`${backend_root}/users`, users)
app.use(`${backend_root}/projects`, projects)
app.use(`${backend_root}/analyses`, analyses)
app.use(`${backend_root}/auth`, auth)
app.use(`${backend_root}/upload`, upload)
app.use(`${backend_root}/download`, download)
app.use(`${backend_root}/statistics`, statistics)


app.get('/test', (req, res) => {
    res.send({msg:'The app is online'})
})







app.listen(_port, _=> console.log(`Fortune-io is listening on port ${_port}...`))

