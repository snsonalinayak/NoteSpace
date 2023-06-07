const express = require('express');
const router =express.Router();
const fetchuser= require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

//ROUTE1: Get all Notes: GET "/api/notes/fetchallnotes" No login required
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    try {
        
        const notes = await Note.find({user:req.user.id})
         res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error") 
    }
})


//ROUTE2: Add a new Note using: POST "/api/notes/addnote" No login required
router.post('/addnote',fetchuser,[
    body('title',"Enter must be of min 5 characters").isLength({min:2}),
    body('description',"Description must be of min 5 characters").isLength({min:5}),
], async (req, res) => {
    try {
        
    
    const {title,description,tag}=req.body
    // if there are errors,return bad request & the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){  
        return res.status(400).json({errors: errors.array()});  
    }

    const note= new Note({
        title,description,tag, user:req.user.id
    })
    const savedNote= await note.save()

     res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error")
    }
 })

//ROUTE3: Update an existing Note using: PUT "/api/notes/updatenote" No login required
router.put('/updatenote/:id',fetchuser, async (req, res) => {
    const{title,description,tag}= req.body;

    try {
        
    
    // Create a newNote object
    const newNote={};
    if(title){newNote.title= title};
    if(description){newNote.description= description};
    if(tag){newNote.tag= tag};

    // Find the note to be updated and update it
    let note =await Note.findById(req.params.id);
    if (!note){return res.status(404).send("Not Found")}

    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");

    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json({note});
} catch (error) {
    console.error(error.message);
        res.status(500).send("Internal Server Error")
}
})

//ROUTE4: Delete an existing Note using: DELETE "/api/notes/updatenote" No login required
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    const{title,description,tag}= req.body;
    
try {
    
 
    // Find the note to be deleted and delete it
    let note =await Note.findById(req.params.id);
    if (!note){return res.status(404).send("Not Found")}

    // Allow only if user owns this note:
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");

    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "Note Deleted",note: note});
}   catch (error) {
        console.error(error.message);
            res.status(500).send("Internal Server Error")
    }
})
module.exports= router