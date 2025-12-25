export type NoteItem = {
    //noteID: number,
    kind: 'note',
    title: string,
    date: string,
    path: string,
    content: string,
    isPrivate: boolean
}

export type FolderItem = {
    //folderID: number,
    kind: 'folder',
    title: string,
    path: string,
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