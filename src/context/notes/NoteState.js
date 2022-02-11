import  {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [
        
      ]

      const [notes, setNotes] = useState(notesInitial);

       //Get all notes
       const getNote = async () => {

        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
      }


      //ADD a note
      const addNote = async (title,description,tag) => {

        //API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        body: JSON.stringify({title,description,tag}) 
        });
        const note = await response.json(); 
       
        
        setNotes(notes.concat(note));
      }

      //DELETE a note
      const deleteNote = async (id) => {
         //API call
         const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        
        });
        const json = await response.json(); 
        console.log(json);
        const newnotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newnotes);

      }

      //EDIT a note
      const editNote = async (id,title,description,tag)=> {
        //API call
        console.log(id);
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        body: JSON.stringify({title,description,tag}) 
        });
        const json = await response.json(); 
        console.log(json);
      
      
       let newNote = JSON.parse(JSON.stringify(notes));
       // edit a note on client side
        for (let index = 0; index < newNote.length; index++) {
          const element = newNote[index];
          console.log(element);
          console.log(id);
          if(element._id === id){
            newNote.title = title;
            newNote.description = description;
            newNote.tag = tag;
            break;
          }
          
        }
        console.log(newNote);
        setNotes(newNote);
        console.log(notes);
      }
    return(
    <NoteContext.Provider value = {{notes, getNote, addNote, deleteNote, editNote}}>
    {props.children}
    </NoteContext.Provider>
    )
}

export default NoteState;