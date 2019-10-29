const express = require('express')
let mysql = require("mysql")
const config = require('./content/.pushconf.json')

const app = express();
const pool = mysql.createPool({
  onnectionLimit: 10,
  host: config.dbInfo.host,
  user: config.dbInfo.user,
  password: config.dbInfo.password,
  database: config.dbInfo.database,
});

app.use(express.static('public'))
app.get('/', () => {
  res.sendFile('index.html')
})

app.get('/api/projects', (req, res) => {
  pool.query('select slug,title,lastUpdated,description from Projects', (error, results) => {
    if (error) {
      console.log(error)
      res.sendStatus(500)
    } else {
      res.send(results)
    }
  })
})

app.listen(3000)
