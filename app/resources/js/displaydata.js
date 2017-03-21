class Displaydata {

    send(gt, platform, game){
        return new Promise(function(resolve, reject) {
            ipcRenderer.send('api-send-data', {gt, platform, game});
            ipcRenderer.on('api-response-data', (event, response) => {
                if(response.error){
                    response.error.gamertag = gt;
                    response.error.platform = platform;
                    response.error.game = game;
                    reject(response.error);
                }
                resolve(response.response);
            });
        });
    }

    set parse(data){
        let loading = new CustomLoader;
        loading.settings = {text : "Fetching data from server .."};
        loading.show();
        this.send(data.gamertag, data.platform, data.game).then((response) => {
            console.log(response);
            loading.delete;
            new watchGamerTags(response.profile.displayName, this.platform(data.platform));
            this.view(response);
            window.ApiContentLoaded = true;
        }).catch((error) => {
            let Alert = new CustomAlert;
            loading.delete;
            Alert.setTitleText = "Player Not Found.";
            Alert.setConfirmButton = { visible : false };
            Alert.setBodyHtml = `
                <h4>We didn't find ${error.gamertag} stats.</h4>

                - check that ${error.gamertag} exists. <br/>

                - check that ${error.gamertag} has account at ${this.platform(error.platform)}. <br/>

                - check that ${error.gamertag} has played ${this.game(error.game)} at least once. <br/>

                - check that you have internet access.
                `;
            Alert.setCencelButton = { text : "Close"};
            Alert.show();
        });
    }

    view(data){
        let exiting_display = document.querySelectorAll('.display');
        if (exiting_display.length > 0)
            exiting_display.forEach((e) => e.remove());
        let display = document.createElement('div');
        display.classList.add('display');
        document.body.appendChild(display);
        let welcome = document.querySelector('.welcome');
        if(welcome)
            welcome.remove();
        this.setHeader({
            gt   : data.profile.displayName,
            plat : this.platform(data.profile.platform),
            id   : data.profile.personaId,
            g    : this.game(data.profile.game),
            rank : data.result.rank.number,
            tracker: data.profile.trackerUrl
        }, display);
        this.setContent(data, display);
    }

    setHeader(arg = {}, display){
        let title = document.createElement('div');
        title.classList.add('col', 'bg-light-black', 'title');
        display.appendChild(title);
        // add children to hold player data
        let gtE = document.createElement('p');
        gtE.classList.add('gt');
        gtE.textContent = arg.gt;
        title.appendChild(gtE);

        let infoE = document.createElement('p');
        infoE.classList.add('info');
        title.appendChild(infoE);

        // platform
        let infoE_plat = document.createElement('span');
        infoE_plat.classList.add('qa');
        infoE_plat.dataset.label = "Network";
        infoE_plat.textContent = arg.plat;
        infoE.appendChild(infoE_plat);

        // rank
        let infoE_rank = document.createElement('span');
        infoE_rank.classList.add('qa');
        infoE_rank.dataset.label = "Rank";
        infoE_rank.textContent = arg.rank;
        infoE.appendChild(infoE_rank);

        // game
        let infoE_game = document.createElement('span');
        infoE_game.classList.add('qa');
        infoE_game.dataset.label = "Game";
        infoE_game.textContent = arg.g;
        infoE.appendChild(infoE_game);

        // player id
        let infoE_id = document.createElement('span');
        infoE_id.classList.add('qa');
        infoE_id.dataset.label = "ID";
        infoE_id.textContent = arg.id;
        infoE.appendChild(infoE_id);

        // player link to battlefieldtracker
        let infoE_weblink = document.createElement('a');
        infoE_weblink.classList.add('qa');
        infoE_weblink.textContent = "battlefieldtracker.com";
        infoE_weblink.ondragstart = () => false;
        infoE_weblink.href = "#";
        infoE_weblink.setAttribute('onClick',`shell.openExternal("${arg.tracker}")`);
        infoE.appendChild(infoE_weblink);

    }

    setContent(data, display){
        let col1 = document.createElement('div');
        col1.classList.add('col', 'bg-light-black');
        display.appendChild(col1);

            let row1 = document.createElement('div');
                row1.classList.add('row');
                row1.dataset.title = "General";
                col1.appendChild(row1);

                    let deaths = document.createElement('p');
                        deaths.classList.add('stat');
                        deaths.dataset.label = "deaths";
                        deaths.textContent = data.result.deaths;
                        row1.appendChild(deaths);

                    let kills = document.createElement('p');
                        kills.classList.add('stat');
                        kills.dataset.label = "kills";
                        kills.textContent = data.result.kills;
                        row1.appendChild(kills);

                    let kpm = document.createElement('p');
                        kpm.classList.add('stat');
                        kpm.dataset.label = "kpm";
                        kpm.textContent = data.result.kpm;
                        row1.appendChild(kpm);

                    let spm = document.createElement('p');
                        spm.classList.add('stat');
                        spm.dataset.label = "spm";
                        spm.textContent = data.result.spm;
                        row1.appendChild(spm);

                    let skill = document.createElement('p');
                        skill.classList.add('stat');
                        skill.dataset.label = "skill";
                        skill.textContent = data.result.skill;
                        row1.appendChild(skill);

                    let timeplayed = document.createElement('p');
                        timeplayed.classList.add('stat');
                        timeplayed.dataset.label = "time played";
                        let __tp = Math.floor( data.result.timePlayed / 3600);
                        let __timeplayed = __tp + ` ${(__tp == 1)? 'hour' : 'hours'}`;
                        timeplayed.textContent = __timeplayed;
                        row1.appendChild(timeplayed);

            let winLose = document.createElement('div');
                winLose.classList.add('row');
                winLose.dataset.title = "Wins/Losses";
                col1.appendChild(winLose);

                let win = document.createElement('p');
                    win.classList.add('stat');
                    win.dataset.label = "wins";
                    win.textContent = data.result.wins;
                    winLose.appendChild(win);

                let losse = document.createElement('p');
                    losse.classList.add('stat');
                    losse.dataset.label = "losses";
                    losse.textContent = data.result.losses;
                    winLose.appendChild(losse);

            let rank_ = document.createElement('div');
                rank_.classList.add('row');
                rank_.dataset.title = "Rank";
                col1.appendChild(rank_);

                let rank_image = document.createElement('img');
                    rank_image.classList.add('stat', 'img');
                    rank_image.src = this.make_link(data.bbPrefix, data.result.rank.imageUrl);
                    rank_image.ondragstart = () => false;
                    rank_.appendChild(rank_image);

                let rank_name = document.createElement('p');
                    rank_name.classList.add('stat');
                    rank_name.textContent = data.result.rank.name;
                    rank_.appendChild(rank_name);

                let rank_progress = document.createElement('div');
                    rank_progress.classList.add('stat', 'progress');
                    rank_.appendChild(rank_progress);

                    let rank_progress_span = document.createElement('span');
                        rank_progress_span.style.width = ((data.result.rankProgress.current * 100) / data.result.rankProgress.total).toString() + "%";
                        rank_progress_span.dataset.value = `${data.result.rankProgress.current} / ${data.result.rankProgress.total}`;
                        rank_progress.appendChild(rank_progress_span);


    }

    platform(p){
        switch (p) {
            case 1:
                return "Xbox Live";
            break;

            case 2:
                return "PlaySation Network";
            break;

            case 3:
                return "Origin";
            break;

            case "PC":
                return "Origin";
            break;

            case "XBOX":
                return "Xbox";
            break;

            case "PS4":
                return "PlaySation";
            break;

            default:
                return "Unknown"
            break;
        }
    }

    game(g){
        let games = { tunguska : 'Battlefield 1', bf4 : 'Battlefield 4'};
        return games.hasOwnProperty(g) ? games[g] : g;
    }
    make_link(bbprefix , src){
        let _src = src.slice(11);
        return bbprefix + _src;
    }
}
