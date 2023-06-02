"use strict";


var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(__filename);
var db = {};
require('../config/config');
require("../config/constants");
const environment=CONFIG.environment;

if (environment && environment.toLowerCase() == "test") {
  CONSTANT.SCHEMAS.forEach((item) => {
    fs.readdirSync(__dirname + "/" + item)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
        );
      })
      .forEach((file) => {
        db[file.slice(0, -3)] = {
          findOne: () => { },
          find: () => { },
          create: () => { },
          update: () => { },
          delete: () => { },
          findAndCountAll: () => { },
          count: () => { },
          findAll: () => { },
        };
      });
  });
  db.sequelize = {
    transaction: (item) => { let runAfterCommit; return Promise.resolve({ commit: () => { if (runAfterCommit && runAfterCommit.func) { runAfterCommit.func(); } }, rollback: () => { }, afterCommit: (func) => { runAfterCommit = { func: func } } }) },
    QueryTypes: {
      SELECT: {}
    }
  }
}
else
{
  let sequelize = new Sequelize(
    CONFIG.db_name,
    CONFIG.db_user,
    CONFIG.db_password,
    {
      host: CONFIG.db_host,
      dialect: CONFIG.db_dialect,
      port: CONFIG.db_port,
      logging: false,
      define: {
        timestamps: false,
        underscored: true,
      },
      pool: {
        max: Number(CONFIG.max_pool_conn),
        min: Number(CONFIG.min_pool_conn),
        idleTime: CONFIG.conn_idle_time,
      },
      dialectOptions: {
        useUTC: true,
      },
    }
  );
  const schemaCreate = async function () {
    const test = [];
    var schemas = await sequelize.showAllSchemas().then(
      (s) => {
        CONSTANT.SCHEMAS.forEach((item) => {
          if (s.indexOf(item) < 0) {
            sequelize.createSchema(item).then((res) => { });
          }
        });
      },
      (err) => {
        console.log("in err", err);
      }
    );
    return schemas;
  };

  CONSTANT.SCHEMAS.forEach((item) => {
    fs.readdirSync(__dirname + "/" + item)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
        );
      })
      .forEach((file) => {
        var model = require(path.join(__dirname + "/" + item, file))(
          sequelize,
          Sequelize.DataTypes
        );
        db[file.slice(0, -3)] = model;
      });
  });
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].association) {
      db[modelName].association(db);
    }
  });
  db.schemaCreate = schemaCreate();
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}
module.exports = db;








// module.exports = sequelize;

// fs
//     .readdirSync(__dirname)
//     .filter(file => {
//         // console.log(file,'in before');
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//         // const model = require(path.join(__dirname, file));
//         // db[model.name] = model;
//         // db[file] = __dirname+"\\"+file;
//         // console.log('in db new',__dirname+"\\"+file);
//         // console.log(file,'in file',model);
//         // console.log(JSON.stringify(model),'in model');

//         // var model = require(path.join(__dirname, file));
//         // db[model.name] = model;
//         // console.log(model.name,'in model name');
//         if(file.includes('history.js')){
//             console.log('in file',file, __dirname);
//             var model =  require(path.join(__dirname, file));
//             console.log(model,'in model name val');
//             db[model.name] = model;

//         }

//     });

// Object.keys(db).forEach(modelName => {
//     //  console.log('model name = ',modelName,',',JSON.stringify(db['reward_point_rates']));
//     if (db[modelName].associate) {
//         db[modelName].associate(db);
//     }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
// // module.exports = sequelize;
