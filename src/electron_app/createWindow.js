import { BrowserWindow } from 'electron';

let win;

function createWindow() {
	console.log("__dirname", __dirname);
	win = new BrowserWindow({ width: 1600, height: 800 });
	win.loadURL(__dirname + './../index.html');
	// win.loadURL('../../dist/index.html');
	win.on('close', () => {
		win = null;
	});

	win.webContents.openDevTools();
}

export default createWindow;