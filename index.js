const electron = require('electron');
const {
	app,
	BrowserWindow,
	globalShortcut
} = electron;
let win;
app.on('ready', function() {
	win = new BrowserWindow({
		show: false
	});
	win.maximize();
	win.loadURL('file://' + __dirname + '/index.html');
	win.setMenu(null);
	win.webContents.on('did-finish-load', function() {
		win.show();
	});
	globalShortcut.register("CommandOrControl+Q", function() {
		app.quit();
		app.exit();
	})
})
app.on('close', function() {
	app.quit();
	app.exit();
});