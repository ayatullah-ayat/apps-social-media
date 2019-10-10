const userCollections = require('../db').collection("users")
const validator = require('validator');

let User = function(data) {
    this.data = data;
    this.errors = [];
}

User.prototype.cleanUp = function() {
    if(typeof(this.data.username) != 'string') {this.data.username = ""}
    if(typeof(this.data.email) != 'string') {this.data.email = ""}
    if(typeof(this.data.password) != 'string') {this.data.password = ""}

    //rid of all bogus properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password
    }
}

User.prototype.validate = function() {
    //username
    if(this.data.username == ""){this.errors.push('The user name you provided are empty')};
    if(this.data.username.length > 0 && this.data.username.length < 3){this.errors.push('The user name must be at least 3 charecters')};
    if(!validator.isAlphanumeric(this.data.username)){this.errors.push('The user name should be alpha numeric, nothing else')};
    //email
    if(this.data.email == ""){this.errors.push('The email you provided are empty')};
    if(!validator.isEmail(this.data.email)) {this.errors.push('The email is not valid')}
    //password
    if(this.data.password == ""){this.errors.push('The password you provided are empty')};
    if(this.data.password.length > 0 && this.data.password.length < 12){this.errors.push('The password should have at least 12 charecters')};
    if(this.data.password.length > 100) {this.errors.push('The password can not exceed 100 charecters')};
}

User.prototype.register = function(){
    this.cleanUp();
    this.validate();
    // after clean up and validate data, insert to database
    if(!this.errors.length){
        userCollections.insertOne(this.data)
    }
}
module.exports = User;