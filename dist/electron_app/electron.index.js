'use strict';

var _electron = require('electron');

var _createWindow = require('./createWindow');

var _createWindow2 = _interopRequireDefault(_createWindow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import setAppMenu from './setAppMenu';

_electron.app.on('ready', function () {
	// setAppMenu()
	console.log('app.getAppPath():', _electron.app.getAppPath());
	(0, _createWindow2.default)();
});

_electron.app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		_electron.app.quit();
	}
});

_electron.app.on('activated', function (_e, hasVisibleWindows) {
	if (!hasVisibleWindows) {
		(0, _createWindow2.default)();
	}
});