import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context  = useContext(noteContext)
    const { note, updateNote } = props;
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3 text-bg-light" >
                    <div className="card-body">
                        <div className="d-flex mb-3 ">

                        <h5 className="card-title me-auto ">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2 p-1 " onClick={()=>{deleteNote(note._id);props.showAlert("Deleted successfully.","success")}} ></i>
                        <i className="fa-solid fa-pen-to-square mx-2 p-1" onClick={()=>{updateNote(note);}} ></i>
                        <div>
                            <span class="badge bg-success">{note.tag?note.tag:"Default"}</span></div>
                        </div>
                        <p className="card-text"> {note.description}  </p>
                    </div>
            </div>
            
            
        </div>
    )
}

export default NoteItem