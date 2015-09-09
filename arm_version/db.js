var Bookshelf = require('bookshelf');

var config = {
   host: 'localhost',  
   user: 'root', 
   password: '', 
   database: 'Users',
   charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
   client: 'mysql', 
   connection: config
});

module.exports.DB = DB;
