const mongodb = require('mongodb');
const dotEnv = require('dotenv');

dotEnv.config();

mongodb.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client;
    const app = require('./app')
    app.listen(process.env.PORT)
})