window.onload = (event) => {
    let nav = new Nav;
    nav.run;
}

let aboutHtmlTemplate = `<span style="color: white; text-shadow: none;">
    <p><i>Developer</i>: karam karim(Black1Ghost3)</p>
    <p><i>Website</i>: <a href="#" onClick="shell.openExternal('https://github.com/BlackGhost3')">Github</a></p>
    <p><i>Email</i>: <span class="email-address">karamkarim.py@gmail.com</span></p>
    <p><i>License</i>: Licensed under the MIT License.</p>
    <p>libraries :
        FontAwesome <a href="#" onClick="shell.openExternal('http://fontawesome.io/')">FontAwesome.io</a> ,
        Animate.css <a href="#" onClick="shell.openExternal('https://daneden.github.io/animate.css/')">daneden.github.io</a></p>
    <p style="width: 100%; text-align:center;"> <small style="color:indianred;"> <i class="fa fa-code"></i> with <i class="fa fa-heart"></i></small> </p>
    <code>powered by <a href="#" onclick="shell.openExternal('https://battlefieldtracker.com/')">battlefield tracker network</a></code>
</span>`;

let settingsHtmlTemplate = `<div class="alert-settings-container">
    <ul>
    <li>
    <span class="label profile">
        <i class="fa fa-database"></i>
    <span class="text">Profile Name</span>
    </span>
    <span class="answer">playsation4 bf1</span>
    </li>

    <li>
    <span class="label">
        <i class="fa fa-tag"></i>
    <span class="text">GamerTag</span>
    </span>
    <span class="answer">Black1Ghost3</span>
    </li>

    <li>
    <span class="label">
    <i class="fa fa-feed"></i>
    <span class="text">Platform</span>
    </span>
    <span class="answer">PS4</span>
    </li>

    <li>
    <span class="label">
    <i class="fa fa-gamepad"></i>
    <span class="text">Game</span>
    </span>
    <span class="answer">battlefield 1</span>
    </li>
    </ul>
</div>`;





class Nav {
    constructor(){
        this.elements = {
            parent : document.querySelector('#nav'),
            children : document.querySelector('#nav').children
        }
    }
    search(){
        let Prompt = new CustomPromptPlayerSearch;
        Prompt.setTitle         =  "Search for player stats";
        Prompt.setCencelButton  =  { className : "danger" , text : "Close"};
        Prompt.setConfirmButton =  { className : "success", text : 'Search'};
        Prompt.setOptions       =  { placeholder : "GamerTag", minLength : 5, maxLength: 15};
        Prompt.show();
        Prompt.done(function (data) {
            let renderdata  = new Displaydata;
            renderdata.parse = data;
            Prompt.delete();

        })
    }
    about() {
        let Alert = new CustomAlert;
        Alert.setTitleText = "Battlefield Stats";
        Alert.setBodyHtml = aboutHtmlTemplate;
        Alert.setCencelButton  = { text : "Close" };
        Alert.setConfirmButton = { visible : false };
        Alert.show();
    }

    // settings() {
    //     let Alert = new CustomAlert;
    //     Alert.setTitleText = "Battlefield Profile";
    //     Alert.setBodyHtml = settingsHtmlTemplate;
    //     Alert.setCencelButton = { text : 'Close', className : "info" };
    //     Alert.setConfirmButton = {text : 'Add Profile', className : "success"};
    //     Alert.show();
    // }

    get run(){
        let element = this.elements.children;
        for (var i = 0; i < element.length; i++) {
            element[i].addEventListener('click', (e) => {
                let method = e.target.dataset.run;
                let args = e.target.dataset.args;
                if (method != undefined) {
                    if(args == undefined || Boolean(args.trim().length) == false)
                        args = null;
                    this[method](args);
                }
            });
        }
    }

}
