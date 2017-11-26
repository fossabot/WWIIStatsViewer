const electron = require('electron');
const { app, BrowserWindow } = electron;

let win;

app.on('ready', function() {
    win = new BrowserWindow({ show: false });
    win.loadURL('file://' + __dirname + '/index.html');
    win.maximize();
    win.webContents.on('did-finish-load', function() {
        win.show();
    });
})
app.on('close', function() {
    app.quit();
});