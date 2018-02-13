var mongoose = require('mongoose')
const join = require('path').join
const fs = require('fs')

const models = join(__dirname, '/schemas')
fs.readdirSync(models)
  .forEach(file => {
    let modelSchema = require(join(models, file)).getSchema()

    modelSchema.pre('save', function (next) {

      this.updatedAt = Date.now()
      console.log('Save the document with date: ' + this.updatedAt)
      next()

    })

    modelSchema.pre('update', function () {

      let updatedAt = Date.now()
      this.update({}, {$set: {updatedAt: updatedAt}})
      console.log('Updating the document with date: ' + updatedAt)

    })

  })

const User = mongoose.model('User', require('./schemas/user').getSchema())
const Answer = mongoose.model('Client', require('./schemas/answer').getSchema())

var db = mongoose.connection
const connectionString = 'mongodb://localhost/test'

db.on('connecting', () => {

})

db.on('error', (error) => {
  console.error(`Error in MongoDb connection: ${error}`)
  mongoose.disconnect()
})
db.on('connected', () => {
  console.log('mongodb connected')
})
db.once('open', () => {
  console.log('mongodb open')
})
db.on('reconnected', () => {
  console.log('MongoDB reconnected!')
})
// TODO: questionable fallback, need investigation
db.on('disconnected', () => {
  console.log('MongoDB disconnected!')
  mongoose.connect(connectionString, {server: {auto_reconnect: true}})
})

mongoose.set('debug', false)
mongoose.connect(connectionString, {
  autoReconnect: true,
  useMongoClient: true,
  promiseLibrary: global.Promise,
})

exports.getUser = function () {
  return User.find(function (err, users) {
    return JSON.stringify(users)
  })
}

exports.updateUser = function (memberNo) {
  User.findById('8c91c13c6a57e99df46aa69939de61833e8ed7f80a222fdda67b5a48a62b841d', function (err, User) {
    User.set({'memberNo': memberNo})
    User.save(function (error, updatedUser) {
      console.log('--------------- User --------------------')
      console.log('User id: ' + updatedUser._id)
      console.log('User memberNo: ' + updatedUser.memberNo)
      console.log('User updatedAt: ' + updatedUser.updatedAt)
      console.log('--------------- End User -----------------')
    })
  })
}

exports.getAnswer = function () {
  return new Answer().getAnswer()
}
