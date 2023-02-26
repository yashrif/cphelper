import { app, shell, BrowserWindow } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";

import "./ipcLoad";
import "./ipcStore";
import "./ipcDelete";

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    title: "CPHelper",
    width: 1270,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false
    }
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else mainWindow.loadFile(join(__dirname, "../renderer/index.html"));

  /* -----------------------------Adding redux dev tool ----------------------------- */

  if (is.dev && process.env["ELECTRON_RENDERER_URL"])
    mainWindow.webContents.once("dom-ready", async () => {
      await installExtension([REDUX_DEVTOOLS])
        // .then((name) => console.log(`Added Extension:  ${name}`))
        // .catch((err) => console.log("An error occurred: ", err))
        .finally(() => {
          mainWindow.webContents.openDevTools();
        });
    });
};

app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.cphelper");

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
