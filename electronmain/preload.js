const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    /** Sends a signal to the main process */
    ipcSendToMain: () => {
        ipcRenderer.send('do-a-thing');
        ipcRenderer.send('copy-text');
    },
    /** Set the listener for the reply from the main process */
    ipcReceiveReplyFromMain: (channel, listener) => {
        ipcRenderer.on(channel, listener);
    },
    /** Only sends a fixed string to the console */
    doThing: () => {
        console.log('doThing executed in preload.js');
    },
    /** Get the Electron version */
    getElectronVersion: () => {
        return process.versions.electron; // 'node' or 'chrome' also available
    },
    /** Copy text to the clipboard */
    putOnClipboard: () => {
        ipcRenderer.send('put-on-clipboard');
    },
    /** Reading from the file */
    readFile: (filePath) => {
        return new Promise((resolve, reject) => {
            ipcRenderer.once('readTextResponse', (event, data) => {
                if (data === 'File does not exist' || data === 'Error reading file') {
                    reject(data); // Reject the promise if there was an error
                } else {
                    resolve(data); // Resolve with the file content
                }
            });
            ipcRenderer.send('readText', filePath); // Send the read request
        });
    },
    /** Writing to the file */
    writeFile: (filePath, content) => {
        // Send content to be written to the file
        console.log('Write file called in preload');
        ipcRenderer.send('saveText', content);
    }
});

console.log('preload.js loaded');
