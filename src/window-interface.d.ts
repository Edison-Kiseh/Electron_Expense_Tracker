interface Window {
    api: {
        /** Sends a signal to the main process */
        ipcSendToMain: () => void;
        /** Only sends a fixed string to the console */
        doThing: () => void;
        /** Set the listener for the reply from the main process */
        ipcReceiveReplyFromMain: (channel: string, listener: (event: any, ...arg: any[]) => void) => void;
        /** Get the Electron version */
        getElectronVersion: () => string;
        /** Copy text to the clipboard */
        putOnClipboard: () => void;
        /** Read a file (emit event to main process) */
        readFile: (filePath: string) => Promise<string | null>;
        /** Write a file (emit event to main process) */
        writeFile: (filePath: string, content: string) => void;        
    };
}
