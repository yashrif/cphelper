import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { prisma } from "./lib/prismaClient";
import * as _ from "lodash";
import installExtension, { REDUX_DEVTOOLS } from "electron-devtools-installer";

import { ProblemRating } from "../src/common/types";

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
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // if (isDev) mainWindow.webContents.openDevTools();

  isDev
    ? mainWindow.loadURL("http://localhost:5173/#/problemset")
    : mainWindow.loadFile(path.join(__dirname, "index.html"));
};

app.whenReady().then(() => {
  createMainWindow();

  /* -----------------------------Adding redux dev tool ----------------------------- */

  if (isDev)
    mainWindow.webContents.once("dom-ready", async () => {
      await installExtension([REDUX_DEVTOOLS])
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log("An error occurred: ", err))
        .finally(() => {
          mainWindow.webContents.openDevTools();
        });
    });
});

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- Store --------------------------------- */

ipcMain.handle("STORE_PROBLEM_TAGS", async (_, tags: string[]) => {
  tags?.map(async (tag) => {
    await prisma.tag.upsert({
      where: {
        tag: tag,
      },
      create: {
        tag: tag,
      },
      update: {},
    });
  });
});

ipcMain.handle(
  "STORE_PROBLEM_RATING",
  async (_, problemRating: ProblemRating) => {
    await prisma.problemRating.upsert({
      where: {
        id: 1,
      },
      create: {
        id: 1,
        max: problemRating.max,
        min: problemRating.min,
      },
      update: {
        max: problemRating.max,
        min: problemRating.min,
      },
    });
  }
);

/* ---------------------------------- Load ---------------------------------- */

ipcMain.handle("LOAD_PROBLEM_TAGS", async () =>
  _.map(
    await prisma.tag.findMany({
      select: {
        tag: true,
      },
    }),
    "tag"
  )
);

ipcMain.handle(
  "LOAD_PROBLEM_RATING",
  async () =>
    await prisma.problemRating.findUnique({
      select: { id: false, max: true, min: true },
      where: {
        id: 1,
      },
    })
);
