import { app, BrowserWindow } from "electron";
// import path from "path";

const isDev = process.env.NODE_ENV !== "production";

const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    title: "CPHelper",
    width: 1270,
    height: 720,
    // frame: false,
  });

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.loadURL("http://localhost:5173/");
};

app.whenReady().then(() => {
  createMainWindow();
});
