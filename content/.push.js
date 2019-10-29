let fs = require("fs");
let path = require("path");
let mysql = require("mysql");
let config = require("./.pushconf.json");

// connect to DB
const connection = mysql.createConnection({
  host: config.dbInfo.host,
  user: config.dbInfo.user,
  password: config.dbInfo.password,
  database: config.dbInfo.database,
});

connection.connect(function(error) {
  if (error) throw error;
});

// get slugs for all existing content
let table = config.dbInfo.table

getAllSlugs(connection, table)
  .then((slugs) => {
    const files = fs.readdirSync('.');
    files.filter(str => (str.includes(".json") && str.charAt(0) != '.'))
      .forEach(function(filename) {

        // read metadata from json file
        const filepath = path.join('.', filename);
        let fields = JSON.parse(fs.readFileSync(filepath, 'utf8'));
        fields.slug = filename.replace(".json", "");

        // read content from md file
        let contentFilepath = path.join('.', fields.slug + ".md");
        fields.content = fs.readFileSync(contentFilepath, 'utf8');

        // update existing content or insert new content
        if (slugs.includes(fields.slug)) {
          updateRow(connection, table, fields);
        } else {
          insertRow(connection, table, fields);
        }
      });
  })
  .then(() => connection.end())


/// ----------------------

function getAllSlugs(dbConnection, table) {
  return new Promise(function(resolve, reject) {
    dbConnection.query(`select slug from ${table}`, (error, results, fields) => {
      if (error) throw error;
      slugs = [];
      results.forEach(r => slugs.push(r.slug))
      resolve(slugs);
    });
  });
}

function updateRow(dbConnection, table, querySet) {
  let queryStr = `update ${table} set ? where slug = ?`;
  dbConnection.query(queryStr, [querySet, querySet.slug], function(error) {
    if (error) throw error;
    console.log("Updated " + querySet.slug + " in table " + table);
  });
}

function insertRow(dbConnection, table, querySet) {
  let queryStr = `insert into ${table} set ?`;
  dbConnection.query(queryStr, [querySet], function(error) {
    if (error) throw error;
    console.log("Created " + querySet.slug + " in table " + table);
  });
}
