import { contextBridge, ipcRenderer } from "electron";

import { ProblemRating } from "../src/common/types";

contextBridge.exposeInMainWorld("cf", {
  /* ---------------------------------- Store --------------------------------- */

  storeProblemTags: (tags: string[]): Promise<void> =>
    ipcRenderer.invoke("STORE_PROBLEM_TAGS", tags),

  storeProblemRating: (problemRating: ProblemRating): Promise<void> =>
    ipcRenderer.invoke("STORE_PROBLEM_RATING", problemRating),

  /* ---------------------------------- Load ---------------------------------- */

  loadProblemTags: (): Promise<string[]> =>
    ipcRenderer.invoke("LOAD_PROBLEM_TAGS"),

  loadProblemRating: (): Promise<ProblemRating> =>
    ipcRenderer.invoke("LOAD_PROBLEM_RATING"),
});
