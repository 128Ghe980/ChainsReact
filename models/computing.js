const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
  group: {
    type: String,
    minLength: 1,
    required: true
  },
    total_1h: {
      value: {type: String, minLength: 1, required: true},
      units: {type: String, minLength: 1, required: true},
      
    },
    total_5m: {
      value: {type: String, minLength: 1, required: true},
      units: {type: String, minLength: 1, required: true},
      
    },
    
    total_15m: {
        value: {type: String, minLength: 1, required: true},
        units: {type: String, minLength: 1, required: true},
        
    },
    date: { 
        type: Date,
        required: true
    },

})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  
  module.exports = mongoose.model("Computing",noteSchema)