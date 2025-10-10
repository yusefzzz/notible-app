declare global {
    interface Window {
        electronAPI: {
            loadNotes: () => Promise<any>;
            saveNewNote: (newNote: any) => Promise<any>;
            updateNote: (notes: any) => Promise<any>;
        }
    }
}

export {};