import { useState, useEffect } from 'react';
import './App.css';
import { HiOutlineTrash } from "react-icons/hi2";


function App() {
  const [inputText, setInputText] = useState('');
  const [notes, setNotes] = useState([]);

  function addNote() {
    if (inputText.trim() !== '') {
      const newNote = {
        id: Date.now(),
        text: inputText.trim()
      };
      setNotes([newNote, ...notes]);
      setInputText('');
      localStorage.setItem('notes', JSON.stringify([newNote, ...notes]));

    }
  }

  function deleteNote(id) {

    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }
  
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);
  

  return (
    <div className='app'>
      <h1 className='heading'>Note App</h1>
      <div className='note-input'>
        <input
          type='text'
          placeholder='Write note'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button onClick={addNote}>Add Note</button>
        <hr/>
      </div>
      <div className='notes'>
        {notes.map((note) => (
          <div className='note' key={note.id}>
            <p>{note.text}</p>
            <button className='btn-delete' onClick={() => deleteNote(note.id)}><HiOutlineTrash />
</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
