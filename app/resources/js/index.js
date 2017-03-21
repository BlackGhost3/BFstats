let {remote, ipcRenderer, shell}  = require('electron');

ipcRenderer.on('background-image-r',(event, arg) =>{
    console.log(arg);
    document.querySelector('.root-main').style = `background: url(${__dirname}/resources/images/${arg}) no-repeat center center fixed;`;
});

ipcRenderer.send('background-image');

// global event listner for the app
document.addEventListener('keydown', function (e) {
    if (e.key == "F5")
      location.reload(true);

     if(e.key == "s" && e.ctrlKey === true  && document.querySelectorAll('.custom-alert.prompt.open').length == 0)
            document.querySelector('#nav > li[data-run="search"]').click();

    if (e.key == "c" && e.altKey == true){
        // refresh the head tag only
        let headChache = document.head.innerHTML;
        document.head.innerHTML = "";
        document.head.innerHTML = headChache;
    }
});


window.ApiContentLoaded = false;

function collectionHas(a, b) {
    for(var i = 0, len = a.length; i < len; i ++) {
        if(a[i] == b) return true;
    }
    return false;
}

function findParentBySelector(elm, selector) {
    var all = document.querySelectorAll(selector);
    var cur = elm.parentNode;
    while(cur && !collectionHas(all, cur)) { //keep going up until you find a match
        cur = cur.parentNode; //go up
    }
    return cur; //will return null if not found
}


class watchGamerTags {
    constructor(gt, plat) {
        this.gamerTag = gt;
        this.platform = plat;
        this.noobsList();
    }

    noobsList(){
        if(this.gamerTag.toLowerCase() == "bladedancer13" && this.platform != "PC" && this.platform != "Origin"){
            let noob = new CustomAlert;
            noob.setTitleText = `${this.gamerTag} !`;
            noob.setBodyText = "Interesting!. someone is searching for a noob";
            noob.setConfirmButton = { visible : false};
            noob.setCencelButton = {text : "Yeah it's"};
            noob.show();
        }
    }

}
