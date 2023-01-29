import Player from "@vimeo/player"
import throttle from "lodash.throttle"

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = "videoplayer-current-time"; 

let data = {
    duration: player.getDuration(),
    persent: 0,
    seconds: 0,
}

const  videoplayerCurrentTime = function ({ seconds }) {
    localStorage.setItem(LOCALSTORAGE_KEY, seconds);
}

player.on('timeupdate', throttle(videoplayerCurrentTime, 1000));

player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY)).then(function (seconds) {
    seconds = videoplayerCurrentTime;
});


