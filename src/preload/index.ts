import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

import { Problem, ProblemRating } from "../renderer/src/common/types";

const cf = {
  /* ----------------------------- Store & Delete ----------------------------- */

  storeProblemTags: (tags: string[]): Promise<void> =>
    ipcRenderer.invoke("STORE_PROBLEM_TAGS", tags),

  storeProblemRating: (problemRating: ProblemRating): Promise<void> =>
    ipcRenderer.invoke("STORE_PROBLEM_RATING", problemRating),

  storeProblem: (problem: Problem): Promise<void> => ipcRenderer.invoke("STORE_PROBLEM", problem),

  deleteProblem: (problem: Problem): Promise<void> => ipcRenderer.invoke("DELETE_PROBLEM", problem),

  storeHandle: (handle: string): Promise<void> => ipcRenderer.invoke("STORE_HANDLE", handle),

  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: (): Promise<string[] | null> => ipcRenderer.invoke("LOAD_PROBLEM_TAGS"),

  loadProblemRating: (): Promise<ProblemRating | null> => ipcRenderer.invoke("LOAD_PROBLEM_RATING"),

  loadProblems: (): Promise<Problem[] | null> => ipcRenderer.invoke("LOAD_PROBLEMS"),

  loadHandle: (): Promise<string | null> => ipcRenderer.invoke("LOAD_HANDLE")
};

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("cf", cf);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  // window.cf = cf;
}
