const userCollection = require('../db').db().collection('users')
const followsCollection = require('../db').db().collection('follows')
const ObjectID = require('mongodb').ObjectID
const User = require('./User')

let Follow = function(followedUser, authorId) {
    this.followedUser = followedUser;
    this.authorId = authorId;
    this.errors = []
}
Follow.prototype.cleanUp = function() {
    if(typeof this.followedUser != 'string') { this.followedUser = ''}
}
Follow.prototype.validate = async function(action) {
    let followsUserAccount = await userCollection.findOne({username: this.followedUser})
    if(followsUserAccount){
        this.followedId = followsUserAccount._id
    }else {
        this.errors.push('You can not follow a user that does not exist')
    }

    let doesFollowAlreadyExist = await followsCollection.findOne({followedId: new ObjectID(this.followedId), authorId: new ObjectID(this.authorId)})

    if(action == 'create') {
        if(doesFollowAlreadyExist){
            this.errors.push('You does not follow that user you already follow')
        }
    }
    if(action == 'delete') {
        if(!doesFollowAlreadyExist){this.errors.push('You can not unfollow that user you are not following')}
    }

    if(this.followedId.equals(this.authorId)){this.errors.push('You can not follow yourself')}
    
}

Follow.prototype.create = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate('create')

        if(!this.errors.length){
            await followsCollection.insertOne({followedId: this.followedId, authorId: new ObjectID(this.authorId)})
            resolve()
        }else {
            reject(this.errors)
        }
    })
}

Follow.prototype.removeFollow = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        await this.validate('delete')

        if(!this.errors.length){
            await followsCollection.deleteOne({followedId: new ObjectID(this.followedId), authorId: new ObjectID(this.authorId)})   
            resolve()
        }else{
            reject(this.errors)
        }
    })
}

Follow.isVisitorFollowing = async function(followedId, authorId){
    let followDoc = await followsCollection.findOne({followedId: new ObjectID(followedId), authorId: new ObjectID(authorId)})
 
    if(followDoc){ return true }
    else {return false}
}

Follow.getFollowersById = async function(id) {
    return new Promise(async (resolve, reject) => {
        try{
            
            let followers = await followsCollection.aggregate([
                {$match: {followedId: id}},
                {$lookup: {from: "users", localField: "authorId", foreignField: "_id", as: "userDoc"}},
                {$project: {
                    username: {$arrayElemAt: ["$userDoc.username", 0]},
                    email: {$arrayElemAt: ["$userDoc.email", 0]}
                }}
            ]).toArray()
            followers = followers.map(follower => {
                
                let user = new User(follower, true)
                return {username: follower.username, avatar: user.avatar}
            })
            resolve(followers)
        }catch{
            reject()
        }
        
    })
}

module.exports = Follow