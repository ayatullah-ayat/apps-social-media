const postCollections = require('../db').db().collection('posts')
const ObjectID = require('mongodb').ObjectID
const User = require('./User')

let Post = function(data, userID) {
    this.data = data
    this.errors = []
    this.userID = userID
}


Post.prototype.cleanUp = function() {
    if(typeof this.data.title != 'string') {this.data.title = ""}
    if(typeof this.data.body != 'string') {this.data.body = ""}

    // override request data
    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createDate: new Date(),
        author: ObjectID(this.userID)
    }
}

Post.prototype.validate = function() {
    if(this.data.title == "") {this.errors.push("Please, provide your post title")}
    if(this.data.body == "") {this.errors.push("Body should\'nt be empty")}
}

Post.prototype.create = function() {
    return new Promise((resolve, reject) =>{
        this.cleanUp()
        this.validate()
        if(!this.errors.length){
            postCollections.insertOne(this.data)
            .then(() => {
                resolve()
            })
            .catch((err) => {
                this.errors.push("Please try again later")
                reject(this.errors)
            })
        }else {
            reject("Failed to submit")
        }
    })
}

Post.reusablePostQuery = function(uniqueOperation) {
    return new Promise(async (resolve, reject) => {
        let aggOperation = uniqueOperation.concat([
            {$lookup: {from: 'users', localField: 'author', foreignField: '_id', as: 'authorDocument'}},
            {$project: {
                title: 1,
                body: 1,
                createDate: 1,
                author: {$arrayElemAt: ['$authorDocument', 0]}
            }}
        ])
        let posts = await postCollections.aggregate(aggOperation).toArray()

        posts = posts.map((post) => {
            post.author = {
                username: post.author.username,
                avatar: new User(post.author, true).avatar
            }
            return post
        })
        resolve(posts)
    })
}

Post.findSingleById = function(id) {
    return new Promise(async (resolve, reject) => {
        // secure the sending id first
        if(typeof(id) != 'string' || !ObjectID.isValid(id)) {
            reject()
            return
        }
        let posts = await Post.reusablePostQuery([
            {$match: {_id: new ObjectID(id)}}
        ])

        if(posts.length) {
            resolve(posts[0])
        }else {
            reject()
        }
    })
}

Post.findPostsByAuthor = function(authorId) {
    return Post.reusablePostQuery([
        {$match: {author: authorId}},
        {$sort: {createDate: -1}}
    ])
}

module.exports = Post