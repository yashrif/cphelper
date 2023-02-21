import { app, BrowserWindow, ipcMain, session } from "electron";
import * as path from "path";
import { prisma } from "./lib/prismaClient";

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
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) mainWindow.webContents.openDevTools();

  isDev
    ? mainWindow.loadURL("http://localhost:5173/#/problemset")
    : mainWindow.loadFile(path.join(__dirname, "index.html"));
};

app.whenReady().then(() => {
  createMainWindow();

  const ses = mainWindow.webContents.session;
  console.log(ses.getUserAgent());
});

// cookies.on("change", (e) => {
//   console.log(e);
// });

const useDb = async () => {
  // await prisma.problem.deleteMany();
  await prisma.tag.deleteMany();
  // await prisma.tag.create({
  //   data: [
  //     {
  //       tag: "bfs",
  //     },
  //   ],
  // });
  // await prisma.problem.create({
  //   data: {
  //     contestId: 453,
  //     index: "B",
  //     name: "A test turkey",
  //     rating: 800,
  //     tags: {
  //       connect: [{ tag: "bst" }, { tag: "dp" }, { tag: "bfs" }],
  //     },
  //     solvedCount: 0,
  //     type: "Programming",
  //   },
  // });
  // console.log(
  //   await prisma.problem.findMany({
  //     where: {
  //       tags: {
  //         some: {
  //           tag: {
  //             contains: "bfs",
  //           },
  //         },
  //       },
  //     },
  //   })
  // );
  // console.log(
  //   await prisma.problem.findMany({
  //     select: {
  //       contestId: true,
  //       index: true,
  //       tags: {
  //         select: {
  //           problemContestId: true,
  //           tag: true,
  //         },
  //       },
  //     },
  //   })
  // );
};

useDb()
  .catch((e) => console.error(e.message))
  .finally(async () => await prisma.$disconnect());

ipcMain.handle("STORE_TAGS", (_, tags: string[]) => {
  tags.map(async (tag) => {
    await prisma.tag.create({
      data: {
        tag: tag,
      },
    });
  });
});
