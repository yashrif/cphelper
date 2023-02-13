"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
// import path from "path";
var isDev = process.env.NODE_ENV !== "production";
var createMainWindow = function () {
    var mainWindow = new electron_1.BrowserWindow({
        title: "CPHelper",
        width: 1270,
        height: 720,
        // frame: false,
    });
    if (isDev)
        mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:5173/");
};
electron_1.app.whenReady().then(function () {
    createMainWindow();
});
//# sourceMappingURL=main.js.map