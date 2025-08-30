import { app, BrowserWindow, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// App and window setup
app.whenReady().then(() => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        //backgroundColor: '#282c34',
        webPreferences: {
            preload: path.join(__dirname, "preload.js"), // compiled from preload.ts
        },
    });
    win.loadURL("http://localhost:5173/")
})

// IPC listener
ipcMain.on("store-text", (e, text: string) => {

    // Folder setup

    const docsPath = path.join(app.getPath("documents"));
    const notesDir = path.join(docsPath, "notible", "notes")

    if (!fs.existsSync(notesDir)) {
        fs.mkdirSync(notesDir, { recursive: true }); // recursive makes subfolders automatically
    }
    const uniqueName: string = Date.now().toString() + ".txt"; // unique filename
    const filePath = path.join(notesDir, uniqueName); 
    fs.writeFile(filePath, text, "utf-8", (err) => { // finalise file
        if (err) console.error("Error saving file locally", err);
        else console.log("File saved!")
    }); 
})
