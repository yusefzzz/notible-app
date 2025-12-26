import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { NoteItem } from '../src/domain/FileTypes'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDataPath = path.join(app.getPath('userData'), 'notes.json');

async function loadNotes() {
    try{
        if (fs.existsSync(userDataPath)) {
            const notesString = await fs.promises.readFile(userDataPath, 'utf-8');
            if (notesString) {
                const notes: NoteItem[] = JSON.parse(notesString);
                console.log("These are the notes: " + notes)
                return notes;
            }
            return [];
        }
        return [];
    } catch (error) {
        console.log(error);
    }
}

async function saveNewNote(newNote: NoteItem){
    try{
        const olderNotes = await loadNotes();
        if (olderNotes) olderNotes.push(newNote);
        await fs.promises.writeFile(userDataPath, JSON.stringify(olderNotes));
        console.log("New note saved");
    } catch (error) {
        console.log(error);
    }

}

async function updateNotes(notes: NoteItem[]){
    try {    
        await fs.promises.writeFile(userDataPath, JSON.stringify(notes))
        console.log("Notes updated");
    } catch (error) {
        console.log(error);
    }
}

//NEW
/*async function createFolder(title: string){//, dir: string){
    try{
        //const folderr = FolderNode
        const folderPath = path.join(__dirname, title);
        await fs.promises.mkdir(folderPath, { recursive: true });
        console.log("New folder created");
    } catch (error) {
        console.log(error);
    }

}*/

//NEW
/*async function loadFiles(){
    console.log("Load files");
}*/

// Let React talk to loadNotes(), saveNewNote(), etc through IPC

ipcMain.handle('load-notes', loadNotes);
//ipcMain.handle('load-files', loadFiles)
ipcMain.handle('save-new-note', async (event, newNote) => {
    await saveNewNote(newNote);
    return newNote;
});
ipcMain.handle('update-notes', async (event, notes) => {
    await updateNotes(notes);
    return notes;
});
console.log('Registered IPC channels:', ipcMain.eventNames());


// App and window setup
function createWindow() {
    //console.log("Preload path resolved to:", path.join(__dirname, "preload.js"));

    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        //backgroundColor: '#282c34',
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // compiled from preload.js
        },
    });
    mainWindow.loadURL("http://localhost:5173/")
}
app.whenReady().then(() => {
    createWindow();
})