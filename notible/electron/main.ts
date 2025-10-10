import { app, BrowserWindow, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userDataPath = path.join(app.getPath('userData'), 'notes.json');

async function loadNotes() {
    try{
        if (fs.existsSync(userDataPath)) {
            const notes = await fs.promises.readFile(userDataPath, 'utf-8');
            //console.log("These are the notes: " + notes)
            if (notes) return JSON.parse(notes);
            return []
        }
        return [];
    } catch (error) {
        console.log(error);
    }
}

async function saveNewNote(newNote: any){
    try{
        const olderNotes = await loadNotes();
        //console.log("Fetches notes: " + olderNotes);
        olderNotes.push(newNote);
        await fs.promises.writeFile(userDataPath, JSON.stringify(olderNotes));
        console.log("New note saved");
    } catch (error) {
        console.log(error);
    }

}

async function updateNote(notes: any){
    try {    
        await fs.promises.writeFile(userDataPath, JSON.stringify(notes))
        console.log("Notes updated");
    } catch (error) {
        console.log(error);
    }
}

// Let React talk to loadNotes(), saveNewNote(), etc through IPC

ipcMain.handle('load-notes', loadNotes);
ipcMain.handle('save-new-note', async (event, newNote) => {
    await saveNewNote(newNote);
    return newNote;
});
console.log("Bluebluebn");
ipcMain.handle('update-note', async (event, notes) => {
    console.log("YESYESYES");
    await updateNote(notes);
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