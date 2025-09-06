import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import SideButton from './components/SideButton.tsx'

const App = () => {

    const navigate = useNavigate();

    const [text, setText] = useState("");
    
    return (
        <div className="absolute top-0 left-0 flex flex-col justify-center items-center w-screen h-screen bg-gray-800"style={{ /*backgroundColor: "#1e1e1e"*/ }}>
            <h1 className='font-bebas p-10 text-center text-white'>Notible</h1>
            <div className='flex justify-center'>
                <textarea
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()

                            window.electronAPI.storeTextLocally(text)

                            setText("")
                        }
                    }}
                    placeholder="What have you learnt today..."
                    //className='w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto'
                    className='w-150 h-150 p-3 border-3 rounded-3xl resize-none text-2xl border-gray-500 text-white focus:border-white outline-none'
                    //className="w-full h-64 p-2 border border-gray-400 rounded-lg text-white bg-transparent resize-none placeholder:text-gray-400 leading-normal"
                />
            </div>
            <button className='w-150 h-25 mt-10 rounded-3xl bg-gray-700 outline-none'>

            </button>
        </div>
    )
}


export default App