import { app } from 'electron';
import createWindow from './createWindow';
// import setAppMenu from './setAppMenu';

app.on('ready', () => {
	// setAppMenu()
	console.log('app.getAppPath():', app.getAppPath());
	createWindow();
});

app.on('window-all-closed', () => {
	if(process.platform !== 'darwin'){
		app.quit();
	}
});

app.on('activated', (_e, hasVisibleWindows) => {
	if(!hasVisibleWindows){
		createWindow();
	}
});
