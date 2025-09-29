import React from 'react';
const NoteCard = ({note:
    {noteTitle, noteDate, noteContent, isPrivate}
}) => {
    return (
        <div className='flex-col h-50 w-50 p-5 flex rounded-3xl text-neutralOffWhite bg-neutralDarkest'>
            <h1 className='text-2xl'>
                {noteDate}
            </h1>
            <h2 className='text-1xl mt-3'>
                {noteContent}
            </h2>
        </div>
    )
}
export default NoteCard;