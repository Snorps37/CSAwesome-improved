const { contextBridge, webFrame } = require('electron');

// native page zoom keeps Monaco's mouse/cursor/widget coordinates correct (CSS zoom does not)
contextBridge.exposeInMainWorld('nativeZoom', (factor) => webFrame.setZoomFactor(factor));
