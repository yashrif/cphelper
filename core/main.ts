import { app, BrowserWindow, session } from "electron";
// import path from "path";

// const cookies = session.fromPartition("persist:foobar");

const isDev = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow;
const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    title: "CPHelper",
    width: 1270,
    height: 720,
    // frame: false,
    webPreferences: {
      webviewTag: true,
    },
  });

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.loadURL("http://localhost:5173");
};

app.whenReady().then(() => {
  createMainWindow();

  const ses = mainWindow.webContents.session;
  console.log(ses.getUserAgent());
});

// cookies.on("change", (e) => {
//   console.log(e);
// });
