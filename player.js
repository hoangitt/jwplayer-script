jQuery(function () {
    let jplayer = {
        responsive: true,
        width: "100%",
        autostart: true,
        aspectratio: "16:9"
    };
    jplayer.file = 'demo.mp4'; // file video
    let timeWatchSlug = 'timer_watch'; //slug local storage
    
    const playerInstance = jwplayer("player").setup(jplayer);

    jwplayer().on('firstFrame', () => {
        let startTime = App.getLocalStoreWithExpiry(timeWatchSlug);
        if (startTime) {
            playerInstance.seek(startTime);
        }
    });
    
    //remember position video
    jwplayer().on('play', () => {
        setTimeout(rememberPosition, 30000);
    });

    jwplayer().on('seek', (e) => {
        rememberPosition(e.offset);
    });

    const rememberPosition = (timer) => {
        if (jwplayer().getState() == "IDLE") {
            console.log('not set, set =0');
            localStorage.removeItem(timeWatchSlug);
        } else {
            let timeWatch = (timer ? timer : Math.round(jwplayer().getPosition()));
            console.log('set timer ' + timeWatch);
            App.setLocalStoreWithExpiry(timeWatchSlug, timeWatch, 7);
        }
    };
});
