import React from 'react';
import type { Note } from "./NoteCard";   
import { EllipsisVertical } from 'lucide-react';


type Folder = {
    //folderID: number,
    title: string,
    path: string,
    children: File[]
}

type File = Folder | Note

type FolderCardProps = {
    folder: Folder;
}

const FolderCard: React.FC<FolderCardProps> = ({ folder }) => {
    const { title, path, children } = folder;
    return (
        <div className='flex flex-col h-55 w-55 p-5 rounded-3xl text-neutralOffWhite bg-neutralDark'>
            <div className='flex'>
                <h1 className='text-2xl w-30'>
                    {title}
                </h1>
                <EllipsisVertical />
            </div>
        </div>
    )
}

export default FolderCard;