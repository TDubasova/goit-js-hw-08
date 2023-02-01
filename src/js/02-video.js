import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

const localStorageCurrentTime = function ({ seconds }) {
  localStorage.setItem(LOCALSTORAGE_KEY, seconds);
};

player.on('timeupdate', throttle(localStorageCurrentTime, 1000));

let time = 0;

if (LOCALSTORAGE_KEY) {
  time = localStorage.getItem(LOCALSTORAGE_KEY);
}

player
  .setCurrentTime(time)
  .then(function (seconds) {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        time < 0 || time > player.getDuration();
        break;
      default:
        break;
    }
  });
