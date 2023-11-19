const mongoose = require('mongoose');



// User Schema

const userDetailsSchema = new mongoose.Schema({
  email:{
    type: String,
    required:true,
    unique: true
  },
  username:{
    type: String,
    required:true
  },
  pfp:{
    type:String
  },
  tasks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Task'
  }]

});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);


//create Schema for tasks
const TodoItemSchema = new mongoose.Schema({
  item:{
    type:String,
    required: true,
  },
  createdDate:{
    type:String,
    required: true
  },
  date:{
    type:String,
    required: true
  },
  priority:{
    type:String,
    default: 'low'
  },
  completed:{
    type:Boolean,
    required: true
  },
  notes:{
    type:String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  notification:{
    type: Number
  },
  userEmail:{
    type:String
  }
})

const TodoItem = mongoose.model('TodoItem', TodoItemSchema);


//export this Schema
module.exports = {UserDetails,TodoItem};