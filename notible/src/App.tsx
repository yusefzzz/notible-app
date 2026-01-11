import { useEffect, useState } from 'react';
import './index.css';
import Loading from './components/Loading.tsx';
import NoteCard from './components/NoteCard.tsx';
import SmallButton from './components/SmallButton.tsx';
import { button, div } from 'framer-motion/client';
import type { NoteItem } from '../src/domain/FileTypes.ts'
import { Typewriter } from 'react-simple-typewriter'

////import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import SideButton from './components/SideButton.tsx'

//const fs = require('fs');

const App = () => {

    ////const navigate = useNavigate();

    const [draftText, setDraftText] = useState(""); // maybe load from last note used? (wouldn't be useState(""))
    const [notesList, setNotesList] = useState<NoteItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState<string | null>(null);
    //const [isCreatingFolder, setIsCreatingFolder] = useState(false);
    //const [foldersList, setFoldersList] = useState([]);
    //const [filesList, setFilesList] = useState<FileItem[]>([]);
    //const [isNoteOpen, setIsNoteOpen] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, []);

    useEffect(() => {
        setDraftText(currentNote?.content?? "");
    }, [currentNoteId])

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

    /*const fetchFolders = async () => {
        console.log("fetch folders")
    }*/

    /*const fetchFiles = async () => {
        console.log("fetch files")
        await fetchFolders()
        await fetchNotes()
        const files: FileItem[] = [...foldersList, ...notesList]
        setFilesList(files)
        setIsLoading(false);
    }*/

    const addNote =  async () => {//text: string) => {
        const noteDate: Date = new Date();
        const newNote: NoteItem = {
            id: crypto.randomUUID(),
            kind: 'note',
            title: "",
            createdAt: noteDate.toLocaleString(),
            content: draftText,
            isPrivate: true
        };
        try {
            await window.electronAPI.saveNewNote(newNote);
            fetchNotes();
        } catch (error) {
            console.log("ERROR OCCURRED WHILE SAVING NEW NOTE: " + error);
        }
    }

    const openNote = (index: string) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setCurrentNoteId(index)
    }

    const closeNote = () => {
        setCurrentNoteId(null);
    }

    const currentNote: NoteItem = notesList.find(note => note.id === currentNoteId) as NoteItem;

    const isDirty: boolean = draftText !== (currentNote?.content ?? "");

    const updateNote = async () => {
        if (!currentNote) return;

        if (currentNote.content === draftText) return;

        const updatedNote: NoteItem = {
            id: currentNote.id,
            kind: currentNote.kind,
            title: "",
            createdAt: currentNote.createdAt,
            content: draftText,
            isPrivate: currentNote.isPrivate
        };


        //Search for original note & replace with new note
        const notes: NoteItem[] = notesList.map(note =>
            note.id === updatedNote.id ? updatedNote : note
        )

        try {
            await window.electronAPI.updateNotes(notes.reverse());
            console.log('Notes updated: note changed');

            fetchNotes();
            console.log('Notes fetched after update')
        } catch (error) {
            console.error(
                "ERROR OCCURRED WHILE UPDATING NOTES (update note): ",
                error);
        }
    }

    const deleteNote = async () => {
        const notes: NoteItem[] = notesList.filter(note =>
            note.id != currentNoteId
        );
        try {
            await window.electronAPI.updateNotes(notes.reverse());
            console.log('Notes updated: note deleted');
            closeNote();
            fetchNotes();
        } catch (error) {
            console.log("ERROR OCCURRED WHILE UPDATING NOTES (delete note): " + error);
        }

    }

    /*const createFolder = async () => {
        console.log("Create folder")
        
    }*/

    return (
        <div className="top-0 left-0 flex flex-col justify-center items-center w-screen min-h-screen bg-neutralDarkest">
            <h1 className='font- text-4xl mt-10 p-10 text-center text-neutralOffWhite'>Notible</h1>
            {/*<span className="text-neutralOffWhite min-h-[3rem] inline-flex items-center font-serif text-4xl mt-10 p-10">
                <Typewriter
                words = {["Notible", "nOtiBle", "NOtibLe", "noTibLE"]}
                loop
                typeSpeed = {80}
                />
            </span>*/}
            <div className='flex-col'>
                <textarea className='w-150 h-130 p-3 border-3 rounded-3xl resize-none text-1xl border-neutral text-neutralOffWhite focus:border-neutralLight outline-none'                
                    id="main-textarea"
                    value={draftText}
                    placeholder="What have you learnt today..."
                    onChange={(e) => {
                        setDraftText(e.target.value)
                    }}
                    onKeyDown={async (e) => {
                        if (e.key === "Enter" && !e.shiftKey){
                            e.preventDefault();
                            if (!currentNoteId){
                                //addNote(text);
                                addNote();
                                setDraftText("");
                            } else{
                                updateNote();
                            }
                        }
                    }}
                />
                <div className='flex w-150 h-10 mt-2 justify-end'>
                    {currentNoteId && <SmallButton disabled = {false} label='Delete' onPressed={() => deleteNote()}/>}   
                    <div className='p-1'></div>
                    {currentNoteId && <SmallButton disabled = {false}label='Close' onPressed={() => closeNote()}/>}
                    <div className='p-1'></div>
                    {currentNoteId && <SmallButton disabled = {!isDirty} label='Save' onPressed={() => updateNote()}/>}
                </div>
            </div>
            <h1 className='flex text-3xl mb-10 mt-10 text-neutralOffWhite'>
                My Notes
            </h1>
            <div className = 'w-310 h-100 mb-20 rounded-3xl border-3 border-neutral bg-neutralDarkest overflow-y-auto pr-3'>
                {isLoading?(
                    <Loading />
                ) : (
                    <>
                        {/*<div className='ml-10 mt-10'>
                            <SmallButton label='Create folder' onPressed={() => createFolder()}/>
                        </div>*/}
                        <div className='grid grid-cols-5 p-10 gap-5'>
                            {/*
                                filesList? (
                                    filesList.map
                                ) : (

                                )
                            */}
                            {
                            notesList? (
                                notesList.map(note => (
                                    <NoteCard note={{
                                        id: note.id,
                                        kind: note.kind,
                                        title: note.title,
                                        createdAt: note.createdAt,
                                        content: note.content,
                                        isPrivate: note.isPrivate,
                                    }
                                } onOpen={() => openNote(note.id)}/>
                                ))
                            ) : (
                                <p className='text-2xl font-serif text-neutralLight'>No notes yet</p>
                            )    
                            
                            }
                        </div>
                    </>
                )}
            </div>
        </div>
    )   
}


export default App