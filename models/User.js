let validator = require('validator');

let User = function(data) {
    this.data = data;
    this.errors = [];
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
    this.validate();
}
module.exports = User;