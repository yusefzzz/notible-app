import React from 'react';

type Note = {
    title: string,
    date: string,
    content: string,
    isPrivate: boolean
}

type NoteCardProps = {
    note: Note;
    onOpen: (index: number) => void;
}
const NoteCard: React.FC<NoteCardProps> = ({ note, onOpen }) => {
    const {title, date, content, isPrivate} = note;
    return (
        <div className='flex flex-col h-55 w-55 p-5 rounded-3xl text-neutralOffWhite bg-neutralDarkest'>
            <div className='flex'>
                <h1 className='text-2xl w-30'>
                    {date}
                </h1>
                <button className='h-10 w-10 ml-5 text-1xl rounded-2xl hover:bg-neutralDark'
                onClick={() => onOpen(0)}
                >

                </button>
            </div>
            <h2 className='text-1xl mt-3 line-clamp-3'>
                {content}
            </h2>
        </div>
    )
}
export default NoteCard;