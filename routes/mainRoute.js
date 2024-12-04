const users = require('./userRoute');
function routes(app){
  app.use('/',users);
}
module.exports = routes