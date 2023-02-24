import { contextBridge, ipcRenderer } from "electron";

import { Problem, ProblemRating } from "../src/common/types";

contextBridge.exposeInMainWorld("cf", {
  /* ---------------------------------- Store --------------------------------- */

  storeProblemTags: (tags: string[]): Promise<void> =>
    ipcRenderer.invoke("STORE_PROBLEM_TAGS", tags),

  storeProblemRating: (problemRating: ProblemRating): Promise<void> =>
    ipcRenderer.invoke("STORE_PROBLEM_RATING", problemRating),

  storeProblem: (problem: Problem): Promise<void> =>
    ipcRenderer.invoke("STORE_PROBLEM", problem),

  storeHandle: (handle: string): Promise<void> =>
    ipcRenderer.invoke("STORE_HANDLE", handle),

  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: (): Promise<string[]> =>
    ipcRenderer.invoke("LOAD_PROBLEM_TAGS"),

  loadProblemRating: (): Promise<ProblemRating> =>
    ipcRenderer.invoke("LOAD_PROBLEM_RATING"),

  loadProblems: (): Promise<Problem[]> => ipcRenderer.invoke("LOAD_PROBLEMS"),

  loadHandle: (): Promise<string> => ipcRenderer.invoke("LOAD_HANDLE"),
});
