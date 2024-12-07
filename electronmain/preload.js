const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    /** Set the listener for the reply from the main process */
    ipcReceiveReplyFromMain: (channel, listener) => {
        ipcRenderer.on(channel, listener);
    },
    /** Reading from the file */
    readFile: () => {
        return new Promise((resolve, reject) => {
            ipcRenderer.once('readTextResponse', (event, data) => {
                if (data === 'File does not exist' || data === 'Error reading file') {
                    reject(data); // Reject the promise if there was an error
                } else {
                    resolve(data); // Resolve with the file content
                }
            });
            ipcRenderer.send('read-file'); // Send the read request
        });
    },
    /** Writing to the file */
    writeFile: (content) => {
        // Send content to be written to the file
        console.log('Write file called in preload');
        ipcRenderer.send('write-file', content);
    },
    getElectronVersion: () => {
        return process.versions.electron; 
    }
});

console.log('preload.js loaded');
