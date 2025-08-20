import React from 'react'

const Textbox = () => {
    return (
        <div>
            <textarea
                placeholder="What have you learnt today..."
                //className='w-full bg-light-100/5 px-4 py-3 rounded-lg mt-10 max-w-3xl mx-auto'
                className='w-150 h-150 p-3 border-3 rounded-3xl resize-none align-top text-2xl'
                //className="w-full h-64 p-2 border border-gray-400 rounded-lg text-white bg-transparent resize-none placeholder:text-gray-400 leading-normal"
            />
        </div>
    )
}
export default Textbox
