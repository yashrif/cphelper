import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("cph", {
  storeTags: (tags: string[]) => ipcRenderer.invoke("STORE_TAGS", tags),
});
