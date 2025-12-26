import type { NoteItem } from '../notible/src/domain/FileTypes';

declare global {
    interface Window {
        electronAPI: {
            loadNotes: () => Promise<NoteItem[]>;
            saveNewNote: (newNote: any) => Promise<void>;
            updateNotes: (notes: any) => Promise<void>;
        }
    }
}

export {};