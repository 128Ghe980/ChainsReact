const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
    group: {
      type: String,
      minLength: 1,
      required: true
    },
    active: {
      type: String,
      minLength: 1,
      required: true
    },
    inactive: {
      type: String,
      minLength: 1,
      required: true
    },
    
    dead: {
        type: String,
        minLength: 1,
        required: true
    },

    
    total: {
        type: String,
        minLength: 1,
        required: true
    },
    date: { 
      type: Date,
      required: true
    },

})

const noteSchema2 = new mongoose.Schema({
    name:{
        title:String,
        finally:String,
        last:String
    },
    email:String,
    gender:String
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model("Observers",noteSchema)