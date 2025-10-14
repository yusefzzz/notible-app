declare global {
    interface Window {
        electronAPI: {
            loadNotes: () => Promise<any>;
            saveNewNote: (newNote: any) => Promise<any>;
            updateNotes: (notes: any) => Promise<any>;
        }
    }
}

export {};