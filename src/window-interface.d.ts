interface Window {
    api: {
        /** Set the listener for the reply from the main process */
        ipcReceiveReplyFromMain: (channel: string, listener: (event: any, ...arg: any[]) => void) => void;
        /** Read a file (emit event to main process) */
        readFile: () => Promise<string | null>;
        /** Write a file (emit event to main process) */
        writeFile: (content: string) => void;        
        /** Get the Electron version */
	    getElectronVersion: () => string;
    };
}
