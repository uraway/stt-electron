/* eslint global-require: 0, flowtype-errors/show-errors: 0 */
// @flow
import { app, BrowserWindow, ipcMain } from 'electron';
import { download } from 'electron-dl';
import SpeechToTextV1 from 'watson-developer-cloud/speech-to-text/v1';
import fs from 'fs';

import MenuBuilder from './menu';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

ipcMain.on('speech-to-text', (e, path) => {
  const speechToText = new SpeechToTextV1({
    username: 'f19ce38c-7c76-4a31-a215-62f2873c77d6',
    password: 'pETNBPoPIofK'
  });

  const params = {
    model: 'ja-JP_BroadbandModel',
    content_type: 'wav',
    continuous: true,
    interim_results: true,
    max_alternatives: 3,
    word_confidence: false,
    timestamps: false,
    keywords: ['colorado', 'tornado', 'tornadoes'],
    keywords_threshold: 0.5
  };

  // Create the stream.
  const recognizeStream = speechToText.createRecognizeStream(params);

  // Pipe in the audio.
  fs.createReadStream(path).pipe(recognizeStream);

  const tempFilePath = `${__dirname}/tmp/transcription.txt`;
  // Pipe out the transcription to a file.
  recognizeStream.pipe(fs.createWriteStream(tempFilePath));
  // Get strings instead of buffers from 'data' events.
  recognizeStream.setEncoding('utf8');

  // Displays events on the console.
  function onEvent(name, event) {
    if (name === 'Close:') {
      download(BrowserWindow.getFocusedWindow(), tempFilePath, { saveAs: true });
    }
    console.log(name, JSON.stringify(event, null, 2));
  }

  // Listen for events.
  recognizeStream.on('results', (event) => { onEvent('Results:', event); });
  recognizeStream.on('data', (event) => { onEvent('Data:', event); });
  recognizeStream.on('error', (event) => { onEvent('Error:', event); });
  recognizeStream.on('close', (event) => { onEvent('Close:', event); });
  recognizeStream.on('speaker_labels', (event) => { onEvent('Speaker_Labels:', event); });
});

ipcMain.on('download-file', (event, file) => {
  download(BrowserWindow.getFocusedWindow(), file, { saveAs: true });
});
