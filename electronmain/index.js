// index.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, clipboard } = require('electron')
const path = require('path')
const fs = require('fs');//filesystem
const os = require('os')

const createWindow = () => {
// Create the browser window.
const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        preload: path.join(__dirname, 'preload.js')
    }
})

// and load the index.html of the app.
mainWindow.loadFile('../www/index.html') //WDA aangepast!!

// Open the DevTools.
// mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
createWindow()

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Example IPC communication
// This listener listens on channel 'do-a-thing' defined in preload.js
ipcMain.on('put-on-clipboard', (event, arg) => {
    clipboard.writeText('Example string', 'selection')
    console.log(clipboard.readText('selection'))

    event.reply('put-on-clipboard-reply', 'selection');
});

ipcMain.on('do-a-thing', (event, arg) => {
console.log("Running in main process triggered from renderer");
//example node.js api call:
let hostname = os.hostname();
event.reply('do-a-thing-reply', 'Hi this is main process, I am running on host: '+ hostname)
});



// Handling the 'saveText' event from the renderer
ipcMain.on('saveText', (event, txtVal) => {
    const directoryPath = 'C:\\tmp'; // Directory where the file will be stored
    const filePath = path.join(directoryPath, 'file1.txt'); // File path including file name

    // Ensure the directory exists
    fs.mkdir(directoryPath, { recursive: true }, (dirErr) => {
        if (dirErr) {
            console.error(`Error ensuring directory exists at ${directoryPath}:`, dirErr);
            event.reply('saveTextResponse', 'Error ensuring directory exists');
            return;
        }

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (fileErr) => {
            if (fileErr) {
                console.log(`File does not exist. Creating file at: ${filePath}`);
            } else {
                console.log(`File already exists at: ${filePath}`);
            }

            // Write the content to the file
            fs.writeFile(filePath, txtVal, 'utf8', (writeErr) => {
                if (!writeErr) {
                    console.log(`File written successfully to: ${filePath}`);
                    event.reply('saveTextResponse', 'File written successfully');
                } else {
                    console.error(`Error writing file to ${filePath}:`, writeErr);
                    event.reply('saveTextResponse', 'Error writing file');
                }
            });
        });
    });
});

// Handling the 'readText' event from the renderer
ipcMain.on('readText', (event) => {
    const directoryPath = 'C:\\tmp'; // Directory where the file is stored
    const filePath = path.join(directoryPath, 'file1.txt'); // File path including the file name

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (fileErr) => {
        if (fileErr) {
            console.error(`File does not exist at: ${filePath}`);
            event.reply('readTextResponse', 'File does not exist');
            return;
        }

        // Read the content of the file
        fs.readFile(filePath, 'utf8', (readErr, data) => {
            if (readErr) {
                console.error(`Error reading file at ${filePath}:`, readErr);
                event.reply('readTextResponse', 'Error reading file');
            } else {
                console.log(`File read successfully from: ${filePath}`);
                console.log(data);
                event.reply('readTextResponse', data); // Send the content back to the renderer
            }
        });
    });
});
