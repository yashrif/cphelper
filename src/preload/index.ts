import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

import { Problem, ProblemRating, ProblemShort } from "../renderer/src/common/types";

const cf = {
  /* ---------------------------------- Store --------------------------------- */

  storeProblemTags: (tags: string[]): Promise<string[]> =>
    ipcRenderer.invoke("STORE_PROBLEM_TAGS", tags),

  storeProblemRating: (problemRating: ProblemRating): Promise<ProblemRating> =>
    ipcRenderer.invoke("STORE_PROBLEM_RATING", problemRating),

  storeProblem: (problem: ProblemShort): Promise<ProblemShort> =>
    ipcRenderer.invoke("STORE_PROBLEM", problem),

  storeHandle: (handle: string): Promise<string> => ipcRenderer.invoke("STORE_HANDLE", handle),

  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: (): Promise<string[] | null> => ipcRenderer.invoke("LOAD_PROBLEM_TAGS"),

  loadProblemRating: (): Promise<ProblemRating | null> => ipcRenderer.invoke("LOAD_PROBLEM_RATING"),

  loadProblems: (): Promise<ProblemShort[] | null> => ipcRenderer.invoke("LOAD_PROBLEMS"),

  loadHandle: (): Promise<string | null> => ipcRenderer.invoke("LOAD_HANDLE"),

  /* --------------------------------- Delete --------------------------------- */

  deleteProblem: (problem: Problem): Promise<ProblemShort> =>
    ipcRenderer.invoke("DELETE_PROBLEM", problem)
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
