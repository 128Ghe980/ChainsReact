const mongoose = require('mongoose')

const password = 'sss123456789'

const url =
`mongodb+srv://sss:${password}@cluster0.rhcnb.mongodb.net/ObserverData?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const noteSchema2 = new mongoose.Schema({
    name:{
        title:String,
        finally:String,
        last:String
    },
    email:String,
    gender:String
    /* active: {
        type: String,
        minLength: 1,
        required: true
      },
      dead: {
        type: String,
        minLength: 1,
        required: true
    }, */
})
const Observer =mongoose.model('Observer',noteSchema2)
const observer=new Observer({
    name:{
        title:"mrs",
        finally:"james6",
        last:"brown6",
    },
    gender:"female",
    email:"aaabbb"
    /* active:"22",
    dead:"32", */
})
observer.save().then(result => {
    console.log('observer saved!')
    mongoose.connection.close()
})
