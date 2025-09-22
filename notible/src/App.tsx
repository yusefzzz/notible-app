import { useEffect, useState } from 'react';
import './App.css';
import Loading from './components/Loading.tsx';
import NoteCard from './components/NoteCard.tsx';

////import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import SideButton from './components/SideButton.tsx'

//const fs = require('fs');

const App = () => {

    ////const navigate = useNavigate();

    const [text, setText] = useState("");
    const [notesList, setNotesList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const notes = await window.electronAPI.loadNotes();
            setNotesList(notes);
            console.log("Notes fetched!");
            setIsLoading(false);

        } catch (error) {
            console.log("ERROR OCCURRED WHILE FETCHING NOTES: " + error);
        }
        setIsLoading(false);
    }

    const addNote =  async (text: string) => {
        const noteDate: Date = new Date();
        const note = {
            title: "",
            date: noteDate.toLocaleString(),
            content: text,
            private: true
        };
        try {
            await window.electronAPI.saveNewNote(note);
            console.log("Note saved!");
        } catch (error) {
            console.log("ERROR OCCURRED WHILE SAVING NEW NOTE: " + error);
        }
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-screen h-screen bg-neutralDarkest"       style={{
        overflowY: "scroll",
        padding: "10px",
      }}>

            <h1 className='font-bebas p-10 text-center text-neutralOffWhite'>Notible</h1>
            <div className='flex justify-center'>
                <textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            addNote(text);
                            setText("");
                        }
                    }}
                    placeholder="What have you learnt today..."
                    className='w-150 h-150 p-3 border-3 rounded-3xl resize-none text-2xl border-neutral text-neutralOffWhite focus:border-neutralLight outline-none'                
                />
            </div>
            {/*<button className='w-150 h-25 mt-10 rounded-3xl bg-gray-700 outline-none'>
            </button>*/}
            <div className = 'w-400 h-50 mt-10 rounded-3xl bg-neutralDark'>
                <ul>
                    {isLoading?(
                        <Loading />
                    ) : (
                        <ul className='p-5 gap-5'>
                            {notesList.map((note: any) => (
                                <NoteCard note={{
                                    noteTitle: note.title,
                                    noteDate: note.date,
                                    noteContent: note.content,
                                    isPrivate: note.private
                                }}/>
                            ))}
                        </ul>
                    )}
                </ul>
            </div>
        </div>
    )   
}


export default App