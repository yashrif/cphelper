import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("cf", {
  storeProblemTags: (tags: string[]): Promise<void> =>
    ipcRenderer.invoke("STORE_TAGS", tags),

  loadProblemTags: (): Promise<string[]> => ipcRenderer.invoke("LOAD_TAGS"),
});
