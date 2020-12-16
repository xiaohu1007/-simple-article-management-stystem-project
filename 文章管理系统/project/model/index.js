const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://admin:981007@localhost:27017/';

// Database Name
const dbName = 'project';

// 数据库连接方法
function connect(callback) {
  MongoClient.connect(url, function (err, client) {
    if (err) {
      console.log('数据库连接错误', err);
    } else {
      console.log("数据库连接成功");
      const db = client.db(dbName);
      callback && callback(db)
      client.close();
    }
  })
}

 module.exports = {
   connect
 }