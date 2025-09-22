const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadNotes: () => ipcRenderer.invoke('load-notes'),
    saveNewNote: (newNote) => ipcRenderer.invoke('save-new-note', newNote)
})