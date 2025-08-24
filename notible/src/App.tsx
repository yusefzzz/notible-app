import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'


function App() {

    const [text, setText] = useState("");

    return (
        <div className="absolute top-0 left-0 w-screen h-screen"style={{ backgroundColor: "#1e1e1e" }}>
            <h1 className='font-serif p-10'>Notible</h1>
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
                className='w-150 h-150 p-3 border-3 rounded-3xl resize-none align-top text-2xl'
                //className="w-full h-64 p-2 border border-gray-400 rounded-lg text-white bg-transparent resize-none placeholder:text-gray-400 leading-normal"
            />
        </div>
    )
}

export default App
