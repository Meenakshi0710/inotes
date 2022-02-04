var express = require('express');
var router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');


 //ROUTE:1 fetch all notes of user using:GET "api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchUser, async function (req, res) {
  try {
    
  
    const notes = await Notes.find({user:req.user.id})
    res.send(notes);
 
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")
    
}
})

  //ROUTE:2 Add a new note using:POST "api/notes/addnote" login required
router.post('/addnote', fetchUser, [
  body('title','Enter a valid title').isLength({ min: 3 }),
                    body('description','description must be atleast 5 characters').isLength({ min: 5 }),
], async function (req, res) {
  
    
  try {
  const {title,description,tag} = req.body;

  //if there are errors send bad request and show the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  const note = new Notes({title,description,tag,user:req.user.id});
  const savednote = await note.save();
  res.send(savednote);

} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")
}
})

//ROUTE 3: Update a existing note using:PUT "api/notes/updatenote" login required
router.put('/updatenote/:id', fetchUser, async function (req, res) {

  const {title,description,tag} = req.body;

  //create a new note object
try {
  const newNote = {};
  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};

  //find the note to be updated and update it

  let note = await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found");
  }

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(req.params.id, {$set:newNote},{new:true})
  res.json(note);

  
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")
  
}
})
  
//ROUTE 4: Update a existing note using:DELETE "api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchUser, async function (req, res) {

  

  //find the note to be deleted and delete it
try {
  let note = await Notes.findById(req.params.id);
  if(!note){
    return res.status(404).send("Not found");
  }

  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({"Success" : "Note deleted",note:note});
  
} catch (error) {
  console.error(error.message);
  res.status(500).send("some error occured")
  
}
  
})

  
  module.exports = router