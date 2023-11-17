const mongoose = require('mongoose');

//create Schema
const TodoItemSchema = new mongoose.Schema({
  item:{
    type:String,
    required: true,
  },
  date:{
    type:String,
    required: true
  },
  priority:{
    type:String,
    default: 'medium'
  },
  completed:{
    type:Boolean,
    required: true
  },
  notes:{
    type:String,
    required: true
  }
})

//export this Schema
module.exports = mongoose.model('todo', TodoItemSchema);