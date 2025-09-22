import React from 'react';

const NoteCard = ({note:
    {noteTitle, noteDate, noteContent, isPrivate}
}) => {
    return (
        <div className='h-25 w-25 p-2 rounded-3xl bg-neutralDarkest'>
            {noteTitle + noteDate}
        </div>
    )
}
export default NoteCard;