const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadNotes: () => ipcRenderer.invoke('load-notes'),
    loadFiles: () => ipcRenderer.invoke('load-files'),
    saveNewNote: (newNote) => ipcRenderer.invoke('save-new-note', newNote),
    updateNotes: (notes) => ipcRenderer.invoke('update-notes', notes)
})