// main.js

const { app, BrowserWindow } = require('electron')
const path = require('path')
require('./src')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'browser-preload.js'),
      contextIsolation: false
    }
  })

  process.env.NODE_ENV === 'development' ? mainWindow.loadURL('http://localhost:3000') : mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))

  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // Supports macOS. If no window then create one.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
