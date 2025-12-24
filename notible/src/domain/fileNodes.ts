export type FolderNode = {
    name: string;
    path: string;
    children: Array<FileNode>
}

export type NoteNode = {
    name: string;
    path: string;
}

export type FileNode = FolderNode | NoteNode 