class CustomAlert {
    constructor(){
        this.buttons = {
            confirm : {
                text: 'Okay',
                visible: true,
                callback: null,
                disabled: false,
                className: 'default'
            },
            cancel : {
                text: 'Cencel',
                visible: true,
                callback: null,
                disabled: false,
                className: 'default'
            },
            close : {
                callback : null
            }
        }
        this.properties = {
            close : { closeable : true },
            title : { text : null, html : null },
            body  : { text : null, html : null }
        }
    }

    set setTitleText(title){
        this.properties.title.text = title;
    }

    set setTitleHtml(title){
        this.properties.title.html = title;
    }

    set setBodyText(body){
        this.properties.body.text = body;
    }

    set setBodyHtml(body){
        this.properties.body.html = body;
    }

    set setCloseable(close){
        this.properties.close.closeable = Boolean(close);
    }

    set setConfirmButton(params = {}){
        if (params) {
            let object = this.buttons.confirm;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    set setCencelButton(params = {}){
        if (params) {
            let object = this.buttons.cancel;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    onCancel(callback){
            this.buttons.cancel.callback = callback;
    }

    onClose(callback){
            this.buttons.close.callback = callback;
    }

    show(){
        let body = document.body;
            let custom_alert = document.createElement('div');
            custom_alert.classList.add('custom-alert');
            custom_alert.classList.add('open');
            body.appendChild(custom_alert);

                let second_layer = document.createElement('div');
                second_layer.classList.add('second-layer');
                custom_alert.appendChild(second_layer);

                    let animation = document.createElement('div');
                    animation.classList.add('animated','bounceInDown');
                    second_layer.appendChild(animation);

                        let alert = document.createElement('div');
                        alert.classList.add('alert');
                        animation.appendChild(alert);

                            let header = document.createElement('div');
                            header.classList.add('header');
                            alert.appendChild(header)

                                let headerTitle = document.createElement('span');
                                headerTitle.classList.add('title');
                                if(this.properties.title.text)
                                    headerTitle.textContent = this.properties.title.text;
                                else if(this.properties.title.html)
                                    headerTitle.innerHTML = this.properties.title.html;

                                header.appendChild(headerTitle);

                                if (this.properties.close.closeable){
                                    let headerCloseParent = document.createElement('span');
                                    header.appendChild(headerCloseParent);
                                    let headerClose = document.createElement('span');
                                    headerClose.classList.add('fa', 'fa-close', 'close');
                                    headerCloseParent.appendChild(headerClose);
                                        headerClose.addEventListener('click', () => {
                                            if (this.buttons.close.callback != null)
                                                    this.buttons.close.callback();
                                            custom_alert.remove();
                                        });
                                }

                            let body1 = document.createElement('div');
                            body1.classList.add('body');
                            if(this.properties.body.text)
                                body1.textContent = this.properties.body.text;
                            else if(this.properties.body.html)
                                body1.innerHTML = this.properties.body.html;
                            alert.appendChild(body1);

                            let footer = document.createElement('div');
                            footer.classList.add('footer');

                                if (this.buttons.confirm.visible){
                                    let buttonok = document.createElement('button');
                                    buttonok.classList.add('btn', this.buttons.confirm.className, "confirmbtn");
                                    buttonok.textContent = this.buttons.confirm.text;
                                    if(this.buttons.confirm.disabled)
                                        buttonok.disabled = true;
                                    footer.appendChild(buttonok);
                                        buttonok.addEventListener('click', () => {
                                            if(this.buttons.confirm.callback != null)
                                                this.buttons.confirm.callback();
                                            custom_alert.remove();
                                        });
                                }
                                if (this.buttons.cancel.visible){
                                    let buttoncencel = document.createElement('button');
                                    buttoncencel.classList.add('btn');
                                    buttoncencel.classList.add(this.buttons.cancel.className);
                                    buttoncencel.textContent = this.buttons.cancel.text;
                                    if(this.buttons.cancel.disabled)
                                        buttoncencel.disabled = true;
                                    footer.appendChild(buttoncencel);
                                        buttoncencel.addEventListener('click', () => {
                                            if(this.buttons.cancel.callback != null)
                                                this.buttons.cancel.callback();
                                            custom_alert.remove();
                                        });
                                }
                            alert.appendChild(footer);

    }

}


class CustomPrompt {
    constructor(){
        this.buttons = {
            confirm : {
                text: 'Okay',
                visible: true,
                callback: null,
                disabled: false,
                className: 'default'
            },
            cancel : {
                text: 'Cencel',
                visible: true,
                callback: null,
                disabled: false,
                className: 'default'
            },
            close : {
                callback : null
            }
        }
        this.properties = {
            close : { closeable : true },
            title : { text : null }
        }
        this.textInput = {
            placeholder : null,
            minLength   : 0,
            maxLength   : 255,
            value       : null,
            disabled    : false,
            callback    : null,
            required    : true
        }
    }

    set setTitle(title){
        this.properties.title.text = title;
    }
    set setOptions(params = {}){
        if (params) {
            let object = this.textInput;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    set setCloseable(close){
        this.properties.close.closeable = Boolean(close);
    }

    set setConfirmButton(params = {}){
        if (params) {
            let object = this.buttons.confirm;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    set setCencelButton(params = {}){
        if (params) {
            let object = this.buttons.cancel;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    onCancel(callback){
            this.buttons.cancel.callback = callback;
    }

    onClose(callback){
            this.buttons.close.callback = callback;
    }
    done(callback){
            this.textInput.callback = callback;
    }

    show(){

        let body = document.body;
            let custom_alert = document.createElement('div');
            custom_alert.classList.add('custom-alert','open','prompt');
            body.appendChild(custom_alert);

                let second_layer = document.createElement('div');
                second_layer.classList.add('second-layer');
                custom_alert.appendChild(second_layer);

                    let animation = document.createElement('div');
                    animation.classList.add('animated','bounceInDown');
                    second_layer.appendChild(animation);

                        let alert = document.createElement('div');
                        alert.classList.add('alert');
                        animation.appendChild(alert);

                            let header = document.createElement('div');
                            header.classList.add('header');
                            alert.appendChild(header)

                                let headerTitle = document.createElement('span');
                                headerTitle.classList.add('title');
                                headerTitle.textContent = this.properties.title.text;
                                header.appendChild(headerTitle);

                                    let headerCloseParent = document.createElement('span');
                                    header.appendChild(headerCloseParent);
                                    let headerClose = document.createElement('span');
                                    headerClose.classList.add('fa','fa-close','close');
                                    headerCloseParent.appendChild(headerClose);
                                    if(!this.properties.close.closeable)
                                        headerClose.classList.add('disabled');
                                    headerClose.addEventListener('click', () => {
                                        if (this.buttons.close.callback != null)
                                            headerClose.addEventListener('click', this.buttons.close.callback);
                                        if(this.properties.close.closeable)
                                            custom_alert.remove();
                                    });

                            let body1 = document.createElement('div');
                            body1.classList.add('body');
                            alert.appendChild(body1);

                                let inputText = document.createElement('input');
                                inputText.classList.add('input');
                                // console.log(this.textInput);
                                if(this.textInput.placeholder != null)
                                    inputText.placeholder = this.textInput.placeholder;
                                if(this.textInput.value != null)
                                    inputText.value = this.textInput.value;
                                if(this.textInput.disabled)
                                    inputText.disabled = true;
                                inputText.setAttribute('autofocus','');
                                inputText.minLength = this.textInput.minLength;
                                inputText.maxLength = this.textInput.maxLength;
                                body1.appendChild(inputText);


                            let footer = document.createElement('div');
                            footer.classList.add('footer');

                                if (this.buttons.confirm.visible){
                                    let buttonok = document.createElement('button');
                                    buttonok.classList.add('btn', this.buttons.confirm.className,'confirmbtn');
                                    buttonok.textContent = this.buttons.confirm.text;
                                    if(this.buttons.confirm.disabled)
                                        buttonok.setAttribute('disabled', 'disabled');
                                    footer.appendChild(buttonok);
                                        buttonok.addEventListener('click', () => {
                                        if(this.textInput.required && inputText.value.trim().length < 1
                                            || inputText.value.trim().length < this.textInput.minLength  // fix this mess here too
                                            || inputText.value.trim().length > this.textInput.maxLength){
                                            inputText.classList.add('animated','flash');
                                            setTimeout(() =>{ inputText.classList.remove('flash')}, 3000);
                                            return;
                                        }
                                        this.textInput.callback(inputText.value);
                                        if(this.buttons.confirm.callback != null)
                                                this.buttons.confirm.callback();
                                        custom_alert.remove();
                                        });
                                        inputText.addEventListener('keydown', (e) => { if (e.keyCode == 13) buttonok.click(); });
                                }

                                if (this.buttons.cancel.visible){
                                    let buttoncencel = document.createElement('button');
                                    buttoncencel.classList.add('btn');
                                    buttoncencel.classList.add(this.buttons.cancel.className);
                                    buttoncencel.textContent = this.buttons.cancel.text;
                                    buttoncencel.style = "order:1;"
                                    if(this.buttons.cancel.disabled || !this.properties.close.closeable)
                                        buttoncencel.setAttribute('disabled', 'disabled');
                                    footer.appendChild(buttoncencel);
                                    buttoncencel.addEventListener('click', () => {
                                        if(this.buttons.cancel.callback != null)
                                            buttoncencel.addEventListener('click', this.buttons.cancel.callback);
                                        custom_alert.remove();
                                    });
                                }
                            alert.appendChild(footer);

    }

}


class CustomPromptPlayerSearch {
    constructor(){
        this.buttons = {
            confirm : {
                text: 'Okay',
                visible: true,
                callback: null,
                disabled: false,
                className: 'default'
            },
            cancel : {
                text: 'Cencel',
                visible: true,
                callback: null,
                disabled: false,
                className: 'default'
            },
            close : {
                callback : null
            }
        }
        this.properties = {
            close : { closeable : true },
            title : { text : null },
            alert : { root_element : null }
        }

        this.textInput = {
            placeholder : null,
            minLength   : 0,
            maxLength   : 255,
            value       : null,
            disabled    : false,
            callback    : null,
            required    : true
        }

    }

    set setTitle(title){
        this.properties.title.text = title;
    }
    set setOptions(params = {}){
        if (params) {
            let object = this.textInput;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    set setCloseable(close){
        this.properties.close.closeable = Boolean(close);
    }

    set setConfirmButton(params = {}){
        if (params) {
            let object = this.buttons.confirm;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    set setCencelButton(params = {}){
        if (params) {
            let object = this.buttons.cancel;
            for (var property in params) {
              if (object.hasOwnProperty(property)) {
                  object[property] = params[property];
              }
            }
        }
    }

    onCancel(callback){
            this.buttons.cancel.callback = callback;
    }

    onClose(callback){
            this.buttons.close.callback = callback;
    }

    done(callback){
            this.textInput.callback = callback;
    }

    delete(){
        this.properties.alert.root_element.remove();
    }

    show(){

        let body = document.body;
            let custom_alert = document.createElement('div');
            custom_alert.classList.add('custom-alert','open','prompt');
            body.appendChild(custom_alert);
            this.properties.alert.root_element = custom_alert;

                let second_layer = document.createElement('div');
                second_layer.classList.add('second-layer');
                custom_alert.appendChild(second_layer);

                    let animation = document.createElement('div');
                    animation.classList.add('animated','bounceInDown');
                    second_layer.appendChild(animation);

                        let alert = document.createElement('div');
                        alert.classList.add('alert');
                        animation.appendChild(alert);

                            let header = document.createElement('div');
                            header.classList.add('header');
                            alert.appendChild(header)

                                let headerTitle = document.createElement('span');
                                headerTitle.classList.add('title');
                                headerTitle.textContent = this.properties.title.text;
                                header.appendChild(headerTitle);

                                    let headerCloseParent = document.createElement('span');
                                    header.appendChild(headerCloseParent);
                                    let headerClose = document.createElement('span');
                                    headerClose.classList.add('fa','fa-close','close');
                                    headerCloseParent.appendChild(headerClose);
                                    if(!this.properties.close.closeable)
                                        headerClose.classList.add('disabled');
                                    headerClose.addEventListener('click', () => {
                                        if (this.buttons.close.callback != null)
                                            headerClose.addEventListener('click', this.buttons.close.callback);
                                        if(this.properties.close.closeable)
                                            custom_alert.remove();
                                    });

                            let body1 = document.createElement('div');
                            body1.classList.add('body');
                            alert.appendChild(body1);

                                let inputText = document.createElement('input');
                                inputText.classList.add('input');
                                if(this.textInput.placeholder != null)
                                    inputText.placeholder = this.textInput.placeholder;
                                if(this.textInput.value != null)
                                    inputText.value = this.textInput.value;
                                if(this.textInput.disabled)
                                    inputText.disabled = true;
                                inputText.minLength = this.textInput.minLength;
                                inputText.maxLength = this.textInput.maxLength;
                                inputText.setAttribute('autofocus','');
                                body1.appendChild(inputText);

                                let selects_parent = document.createElement('div');
                                selects_parent.classList.add('selects_parent');
                                body1.appendChild(selects_parent);

                                let select_platform = document.createElement('select');
                                        select_platform.classList.add('select_element');
                                        select_platform.name = "platform";
                                        selects_parent.appendChild(select_platform);

                                        let op_pc = document.createElement('option');
                                        op_pc.value = "PC";
                                        op_pc.textContent = "Origin";
                                        select_platform.appendChild(op_pc);

                                        let op_xone = document.createElement('option');
                                        op_xone.value = "XBOX";
                                        op_xone.textContent = "Xbox";
                                        select_platform.appendChild(op_xone);

                                        let op_ps4 = document.createElement('option');
                                        op_ps4.value = "PS4";
                                        op_ps4.textContent = "Playsation";
                                        select_platform.appendChild(op_ps4);

                                let sp = document.createElement('span');
                                sp.textContent = " - ";
                                selects_parent.appendChild(sp);


                                let select_game = document.createElement('select');
                                        select_game.classList.add('select_element');
                                        select_game.name = "game";
                                        selects_parent.appendChild(select_game);

                                        let op_bf1 = document.createElement('option');
                                        op_bf1.value = "tunguska";
                                        op_bf1.textContent = "Battlefield 1";
                                        select_game.appendChild(op_bf1);

                                        let op_bf4 = document.createElement('option');
                                        op_bf4.value = "bf4";
                                        op_bf4.textContent = "Battlefield 4";
                                        select_game.appendChild(op_bf4);

                                        // waiting for API support of BFH
                                        // let op_bfh = document.createElement('option');
                                        // op_bfh.value = "bfh";
                                        // op_bfh.textContent = "Battlefield Hardline";
                                        // select_game.appendChild(op_bfh);

                            let footer = document.createElement('div');
                            footer.classList.add('footer');

                                if (this.buttons.confirm.visible){
                                    let buttonok = document.createElement('button');
                                    buttonok.classList.add('btn', this.buttons.confirm.className,'confirmbtn');
                                    buttonok.textContent = this.buttons.confirm.text;
                                    if(this.buttons.confirm.disabled)
                                        buttonok.setAttribute('disabled', 'disabled');
                                    footer.appendChild(buttonok);
                                        buttonok.addEventListener('click', () => {
                                        if(this.textInput.required && inputText.value.trim().length < 1 || inputText.value.trim().length < this.textInput.minLength
                                        || inputText.value.trim().length > this.textInput.maxLength){ // fix this mess
                                            inputText.classList.add('animated','flash');
                                            setTimeout(() =>{ inputText.classList.remove('flash')}, 3000);
                                            return;
                                        }
                                        let all_vals = {
                                            gamertag : inputText.value,
                                            platform : select_platform.value,
                                            game     : select_game.value
                                        }
                                        this.textInput.callback(all_vals);
                                        if(this.buttons.confirm.callback != null)
                                                this.buttons.confirm.callback();
                                        // custom_alert.remove();
                                        });
                                        inputText.addEventListener('keydown', (e) => { if (e.keyCode == 13) buttonok.click(); });
                                }

                                if (this.buttons.cancel.visible){
                                    let buttoncencel = document.createElement('button');
                                    buttoncencel.classList.add('btn');
                                    buttoncencel.classList.add(this.buttons.cancel.className);
                                    buttoncencel.textContent = this.buttons.cancel.text;
                                    buttoncencel.style = "order:1;"
                                    if(this.buttons.cancel.disabled || !this.properties.close.closeable)
                                        buttoncencel.setAttribute('disabled', 'disabled');
                                    footer.appendChild(buttoncencel);
                                    buttoncencel.addEventListener('click', () => {
                                        if(this.buttons.cancel.callback != null)
                                            buttoncencel.addEventListener('click', this.buttons.cancel.callback);
                                        custom_alert.remove();
                                    });
                                }
                            alert.appendChild(footer);

    }

}


class CustomLoader {
    constructor() {
        this.properties = {
            loader : {
                className : "fa-pulse",
                text : null, // for showing text under the loader
                title : "Please wait ..."
            },
            alert : {
                root_element : null
            }
        }
    }

    set settings(settings = {}){
        if (settings) {
            let properties = this.properties.loader;
            for (let property in settings){
                if (properties.hasOwnProperty(property)) {
                    properties[property] = settings[property];
                }
            }
        }
    }

    get delete(){
        this.properties.alert.root_element.remove();
    }

    show(){
        let doc = document.body;
            let custom_alert = document.createElement('div');
            custom_alert.classList.add('custom-alert','open','loader');
            doc.appendChild(custom_alert);
            this.properties.alert.root_element = custom_alert;

                let second_layer = document.createElement('div');
                second_layer.classList.add('second-layer');
                custom_alert.appendChild(second_layer);

                    let animation = document.createElement('div');
                    animation.classList.add('animated','bounceInDown');
                    second_layer.appendChild(animation);

                        let alert = document.createElement('div');
                        alert.classList.add('alert');
                        animation.appendChild(alert);

                            let header = document.createElement('div');
                            header.classList.add('header');
                            alert.appendChild(header)

                                let headerTitle = document.createElement('span');
                                headerTitle.classList.add('title');
                                headerTitle.textContent = this.properties.loader.title;
                                header.appendChild(headerTitle);

                            let body1 = document.createElement('div');
                            body1.classList.add('body');
                            alert.appendChild(body1);

                                let loaderParent = document.createElement('div');
                                loaderParent.classList.add('loader-parent');
                                body1.appendChild(loaderParent);

                                    let loader = document.createElement('i');
                                    loader.classList.add("fa", "fa-spinner", this.properties.loader.className, "the-loader");
                                    loaderParent.appendChild(loader);

                                    if(this.properties.loader.text != null){
                                        let text_ = document.createElement('p');
                                        text_.classList.add("loader-text");
                                        text_.textContent = this.properties.loader.text;
                                        loaderParent.appendChild(text_);
                                    }

    }

}
