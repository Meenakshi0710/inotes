import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
   const {addNote} = context;
    const [note, setNote] = useState({title : " ", description : "", tag : ""});
   const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title,note.description,note.tag);
      setNote({title : " ", description : "", tag : ""})
      props.showAlert("Note added successfully","success")
   }

   const handleChange = (e) => {
     setNote({...note, [e.target.name]: e.target.value})

   }
  return (
    <div className='container mt-2'>
    <h2 className='mt-3'>Add Note</h2>
    
    <form className='my-3'>
<div className="mb-3">
  <label htmlFor="title" className="form-label">Title</label>
  <input type="text" className="form-control" id="title" name = "title" value = {note.title} aria-describedby="emailHelp" onChange = {handleChange}  minLength = {5} required/>
</div>
<div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <input type="text" className="form-control" id="description" name = "description" value = {note.description} onChange = {handleChange}  minLength = {5} required/>
</div>
<div className="mb-3">
  <label htmlFor="tag" className="form-label">Tag</label>
  <input type="text" className="form-control" id="tag" name = "tag" value = {note.tag} onChange = {handleChange} minLength = {5} required/>
</div>

<button type="submit" disabled = {note.title.length <5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>

  )
}

export default AddNote;
