const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
    storeTextLocally: (text) => {
        ipcRenderer.send("store-text", text)
    }
})