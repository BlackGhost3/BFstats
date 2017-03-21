const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const api = require('./app/resources/js/api.js');
let win

function createWindow () {

  win = new BrowserWindow({
      width: 1000,
      height: 700,
      icon : `${__dirname}/app/resources/images/icon/favicon.ico`,
      minWidth: 460,
      maxHeight: 700,
      maximizable: false
  })

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

// win.webContents.openDevTools()

win.on('closed', () => { win = null })
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


let last_bg_img_int = null;
function random_background_image_name(path = `${__dirname}/app/resources/images/`){
    let ran = randomInt(0, 10);
    if (ran == last_bg_img_int)
            ran = randomInt(0, 10);

    last_bg_img_int = ran;
    let image_name = `background-${ran}.jpg`;
    let pic = fs.existsSync(path + image_name);
    return (pic === true)? image_name : 'background-0.jpg';
}

ipcMain.on('background-image', (event, arg) => {
  event.sender.send('background-image-r', random_background_image_name())
})

app.on('ready', () => {
    createWindow();
});




ipcMain.on('api-send-data', (event, data) => {
    api.bf(data.gt, data.platform, data.game).then((response) =>{
        console.log(response);
        event.sender.send('api-response-data', {error : null , response});
    }).catch((error) =>{
        event.sender.send('api-response-data', {error});
    });
});
