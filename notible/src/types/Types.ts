type FolderNode = {
    name: string;
    path: string;
    children: Array<FileNode>
}

type NoteNode = {
    name: string;
    path: string;
}

type FileNode = FolderNode | NoteNode 