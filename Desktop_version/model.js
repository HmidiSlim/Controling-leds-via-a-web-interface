var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'newuser',
   idAttribute: 'userId',
});

module.exports = {
   User: User
};
