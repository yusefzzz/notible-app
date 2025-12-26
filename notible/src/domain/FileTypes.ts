export type NoteItem = {
    id: string,
    kind: 'note',
    title: string,
    createdAt: string,
    //path: string,
    content: string,
    isPrivate: boolean
}

export type FolderItem = {
    id: string,
    kind: 'folder',
    title: string,
    //path: string,
    isPrivate: boolean,
    children: FileItem[]
}

export type FileItem = FolderItem | NoteItem




/*export type FolderNode = {
    name: string;
    path: string;
    children: Array<FileNode>
}

export type NoteNode = {
    name: string;
    path: string;
}

export type FileNode = FolderNode | NoteNode 
*/