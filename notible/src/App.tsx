import { useEffect, useState } from 'react';
import './index.css';
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
    const [isNoteOpen, setIsNoteOpen] = useState(false);

    const fetchNotes = async () => {
        setIsLoading(true);
        try {
            const notes = await window.electronAPI.loadNotes();
            notes.reverse();
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
            await fetchNotes();
        } catch (error) {
            console.log("ERROR OCCURRED WHILE SAVING NEW NOTE: " + error);
        }
    }

    const openNote = (index: number) => {
        const currentNote: any = notesList[index];
        setText(currentNote.content)
        setIsNoteOpen(true);
    }

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div className="top-0 left-0 flex flex-col justify-center items-center w-screen min-h-screen bg-neutralDarkest">
            <h1 className='font-serif text-4xl mt-10 p-10 text-center text-neutralOffWhite'>Notible</h1>
            <div className='flex justify-center'>
                <textarea className='w-150 h-130 p-3 border-3 rounded-3xl resize-none text-1xl border-neutral text-neutralOffWhite focus:border-neutralLight outline-none'                
                    id="main-textarea"
                    value={text}
                    placeholder="What have you learnt today..."
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey){
                            if (!isNoteOpen){
                                e.preventDefault();
                                addNote(text);
                                fetchNotes();
                                setText("");
                            }
                        }
                    }}
                />
            </div>
            <div className = 'w-310 h-100 mt-10 mb-20 rounded-3xl bg-neutralDark overflow-y-auto pr-3'>
                <h1 className='text-3xl mt-10 ml-10 text-neutralOffWhite'>
                    My Notes
                </h1>
                {isLoading?(
                    <Loading />
                ) : (
                    <div className='grid grid-cols-5 p-10 gap-5'>
                        {
                        notesList? (
                            notesList.map((note: any, i: number) => (
                                <NoteCard key={i} note={{
                                    title: note.title,
                                    date: note.date,
                                    content: note.content,
                                    isPrivate: note.private,
                                }
                            } onOpen={() => openNote(i)}/>
                            ))
                        ) : (
                            <p className='text-2xl font-serif text-neutralLight'>No notes yet</p>
                        )    
                        
                        }
                    </div>
                )}
            </div>
        </div>
    )   
}


export default App