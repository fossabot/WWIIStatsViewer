const electron = require('electron');
const { app, BrowserWindow, globalShortcut } = electron;
const analytics = require("./analytics");
let win;

app.on('ready', function() {
    win = new BrowserWindow({ show: false });
    win.maximize();
    win.loadURL('file://' + __dirname + '/index.html');
    win.webContents.on('did-finish-load', function() {
        win.show();
        win.setMenu(null);
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