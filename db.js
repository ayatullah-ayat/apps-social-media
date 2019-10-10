const mongodb = require('mongodb');
const connectionString = 'mongodb+srv://todoApp:Inan@123456@cluster0-1vjs3.mongodb.net/socialMediaApp?retryWrites=true&w=majority';
mongodb.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, client) {
    module.exports = client.db();
    const app = require('./app')
    app.listen(3000)
})