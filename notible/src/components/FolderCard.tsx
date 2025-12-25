import React from 'react';
import { EllipsisVertical } from 'lucide-react';
import type { FolderItem } from '../domain/FileTypes'

type FolderCardProps = {
    folder: FolderItem;
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