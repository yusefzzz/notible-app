import React from 'react';
//import { ReactComponent as OptionsSvg } from '../assets/ellipsis-vertical.svg?react';
import options from '../assets/ellipsis-vertical.svg';
import { EllipsisVertical } from 'lucide-react';

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
        <div className='flex flex-col h-55 w-55 p-5 rounded-3xl text-neutralOffWhite bg-neutralDark'>
            <div className='flex'>
                <h1 className='text-2xl w-30'>
                    {date}
                </h1>
                <button className='flex items-center justify-center h-10 w-10 ml-5 text-1xl rounded-2xl hover:bg-neutralDarkest'
                onClick={() => onOpen(-1)}
                >
                    <EllipsisVertical />
                </button>
            </div>
            <h2 className='text-1xl mt-3 line-clamp-3'>
                {content}
            </h2>
        </div>
    )
}
export default NoteCard;