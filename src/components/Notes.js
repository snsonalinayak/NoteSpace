import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import {     useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const {notes, getNotes,editNote}=context;
    let navigate=useNavigate(); 
    useEffect(() => {
        if(localStorage.getItem('token')){

            getNotes(); 
        }
        else{
            navigate("/login")

        }
        // eslint-disable-next-line
    }, [])
    
    
    const ref = useRef(null)    
    const refClose = useRef(null)    
    const [note, setNote] = useState({id:"",etitle: "",edescription: "", etag: "default"})

    const updateNote=(currentNote)=>{
        ref.current.click();
        

        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag });
    }

const handleClick =(e)=>{


    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated successfully","success");
}

const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
    return (
        <>

            
        <AddNote showAlert={props.showAlert}/>
        <button type="button" className="btn btn-outline-light d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal"  tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <form>
                <div className="mb-3 my-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" value={note.etitle} id="etitle" name='etitle' aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>

                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" value={note.edescription} id="edescription" name='edescription' onChange={onChange} minLength={5} required/>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={note.etag} id="etag" name='etag' onChange={onChange}/>
                </div>
                
            </form>
        
                </div>
                <div className="modal-footer">
                    <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-success" onClick={handleClick} >Update Note</button>
                </div>
                </div>
            </div>
            </div>
            <div className="row my-3">

                <h3>Your Notes</h3>
                <div className="container">

                {notes.length===0 && 'No Notes to Display'}
                


                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote}  note={note} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes