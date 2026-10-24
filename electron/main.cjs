const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const { spawnSync } = require('child_process');
const path = require('path');
const { pathToFileURL } = require('url');

app.setName('csawesome');
if (process.platform === 'linux' && typeof app.setDesktopName === 'function') app.setDesktopName('csawesome.desktop');
app.commandLine.appendSwitch('ozone-platform-hint', 'auto');

const iconPath = path.join(__dirname, '..', 'assets', 'icon.png');
const DEV = !!process.env.VITE_DEV;
let win = null;
let api = null;

async function startApi() {
  api = await import(pathToFileURL(path.join(__dirname, '..', 'server', 'index.mjs')).href);
  // Fixed 3001 in dev (Vite proxies to it); in prod falls back to a free port if taken.
  return api.start(3001);
}

function showWindow() {
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.show();
  win.focus();
}

function checkJdk() {
  const r = spawnSync('javac', ['-version'], { windowsHide: true, timeout: 10000 });
  if (r.error || r.status !== 0) {
    dialog.showMessageBoxSync({
      type: 'warning',
      title: 'JDK not found',
      message: 'Java (javac) was not found.',
      detail: 'CSAwesome needs a JDK to compile and run code. Install one (for example Adoptium Temurin from https://adoptium.net), make sure javac is on your PATH, then restart the app. You can still read lessons without it.',
    });
  }
}

async function createWindow() {
  checkJdk();
  const port = await startApi();
  win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    title: 'CSAwesome Improved',
    show: false,
    icon: iconPath,
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: path.join(__dirname, 'preload.cjs') },
  });
  // no default menu: its zoom accelerators would fight the app's own ctrl +/-/0 handling
  Menu.setApplicationMenu(null);
  win.setMenuBarVisibility(false);
  win.webContents.setVisualZoomLevelLimits(1, 1).catch(() => {});
  win.once('ready-to-show', () => win.show());
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.on('closed', () => (win = null));
  win.loadURL(DEV ? 'http://localhost:5173' : `http://127.0.0.1:${port}/`);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', showWindow);
  app.whenReady().then(createWindow);
}

app.on('will-quit', () => { try { api && api.stop(); } catch {} });
app.on('window-all-closed', () => app.quit());
