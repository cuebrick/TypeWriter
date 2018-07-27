'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _electron = require('electron');

var win = void 0;

function createWindow() {
	console.log("__dirname", __dirname);
	win = new _electron.BrowserWindow({ width: 1600, height: 800 });
	win.loadURL(__dirname + './../index.html');
	// win.loadURL('../../dist/index.html');
	win.on('close', function () {
		win = null;
	});

	win.webContents.openDevTools();
}

exports.default = createWindow;