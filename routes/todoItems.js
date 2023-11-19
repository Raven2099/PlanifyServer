const router = require('express').Router();
//import todo model 
const {UserDetails, TodoItem} = require('../models/todoItems');


//create first route --add Todo Item to database
router.post('/api/item', async (req, res)=>{
  try{
    const user = await UserDetails.findOne({email:req.body.userEmail});

    if (!user){
      return res.status(404).json({ message: "User not found"});
    }

    const newItem = new TodoItem({
      item: req.body.item,
      createdDate: req.body.createdDate,
      date: req.body.date, 
      completed: req.body.completed,
      priority: req.body.priority || 'low',
      notes: req.body.notes || ' ',
      category: req.body.category,
      notification: req.body.notification,
      userEmail: req.body.userEmail
    });

    //save this item in database
    const saveItem = await newItem.save()
    user.tasks.push(saveItem._id);
    await user.save();
    res.status(200).json(saveItem);
  }catch(err){
    res.status(500).json({ message: 'Error adding todo item', error: err });
  }
})

//get data from db

// get user's tasks on login
router.get('/api/user/:userEmail/tasks', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const user = await UserDetails.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const userTasks = await TodoItem.find({ userEmail });

    res.status(200).json(userTasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user tasks', error: err });
  }
});

//update route

router.put('/api/item/:id', async (req, res) => {
  try {
    const updateItem = await TodoItem.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).json(updateItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating todo item', error: err });
  }
});

  
  //delete route

  router.delete('/api/item/:id', async (req, res) => {
    try {
      const taskId = req.params.id;
  
      // Find the task to be deleted
      const deletedTask = await TodoItem.findById(taskId);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      // Remove task reference from the user's tasks array
      const user = await UserDetails.findOne({ tasks: taskId });
      if (user) {
        user.tasks.pull(taskId); // Remove task reference
        await user.save();
      }
  
      // Delete the task
      await TodoItem.findByIdAndDelete(taskId);
  
      res.status(200).json('Item Deleted');
    } catch (err) {
      res.status(500).json({ message: 'Error deleting todo item', error: err });
    }
  });


// add a new user to the database
router.post('/api/user', async (req, res) => {
  try {
    const { email, username, pfp } = req.body; // user details from request body

    const existingUser = await UserDetails.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user
    const newUser = new UserDetails({ email, username, pfp });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 
  } catch (err) {
    res.status(500).json({ message: 'Error adding user', error: err });
  }
});

module.exports = router;
