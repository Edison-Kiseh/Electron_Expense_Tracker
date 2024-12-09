// index.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, clipboard } = require('electron')
const path = require('path')
const fs = require('fs');//filesystem
const os = require('os');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

// if(require('electron-squirrel-startup')) return app.quit();

// setting up the icon depending on the platform that the app is running on
let iconPath;
if (process.platform === 'win32') {
  iconPath = path.join(__dirname, '../www/assets/icon/icon.ico');
} else if (process.platform === 'darwin') {
  iconPath = path.join(__dirname, '../www/assets/icon/icon.icns');
} else {
  iconPath = path.join(__dirname, '../www/assets/icon/icon.png');
}

console.log("Icon Path:", iconPath);

const createWindow = () => {
// Create the browser window.
const mainWindow = new BrowserWindow({
    title: 'Expense Tracker',
    icon: iconPath, // setting the icon
    show: false,
    width: 800,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        enableRemoteModule: false,    // Disables the remote module
        preload: path.join(__dirname, 'preload.js')
    }
})

// avoiding the white screen
mainWindow.webContents.on('did-finish-load', function (){
    mainWindow.show();
    mainWindow.focus();
});

// and load the index.html of the app.
mainWindow.loadFile('./www/index.html') 

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

// Example IPC communication

// Handling the 'saveText' event from the renderer
ipcMain.on('write-file', (event, txtVal) => {
    const filePath = path.join(app.getPath('userData'), 'expenses.json');

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

// Handling the 'readText' event from the renderer
ipcMain.on('read-file', (event) => {
    const filePath = path.join(app.getPath('userData'), 'expenses.json');

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
