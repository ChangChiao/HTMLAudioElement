const musicUrl = "https://spmdl.github.io/json-files/rain.mp3";

const limitRange = (num) => {
  const target = num.toFixed(1);
  return Math.min(Math.max(target, 0), 1);
};

const addZero = (num) => {
  if (num.toString().length === 1) {
    return "0" + num;
  }
  return num;
};

const transTime = (sec) => {
  const ss = Math.ceil(sec % 60);
  const mm = Math.floor(sec / 60);
  return `${addZero(mm)}:${addZero(ss)}`;
};

const speedList = [1, 1.25, 1.5, 2, 5];
let speedIndex = 0;
let timer = null;
let duration = 0;
window.onload = function () {
  const audioElement = new Audio(musicUrl);
  audioElement.addEventListener("loadeddata", () => {
    duration = audioElement.duration;
  });

  const progressBar = document.getElementById("progress");
  const setBar = () => {
    const currentTime = transTime(Math.round(audioElement.currentTime));
    document.getElementById("timeSpent").innerText = currentTime;
    document.getElementById("timeLeft").innerText = transTime(
      Math.round(duration) - Math.round(audioElement.currentTime)
    );
    const progress = Math.round(audioElement.currentTime);
    progressBar.value = progress;
    // console.log("progressBar.value", progressBar.value);
    document.getElementById("progress-line").style.width =
      (progress / duration).toFixed(2) * 100 + "%";
  };
  //play and pause
  document.getElementById("play").addEventListener(
    "click",
    function () {
      const isPaused = audioElement.paused;
      console.log("isPaused", isPaused);
      if (isPaused) {
        audioElement.play();
        this.innerHTML = '<i class="fa-solid fa-pause"></i>';
      } else {
        audioElement.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
      }
    },
    false
  );
  //muted
  document.getElementById("volume").addEventListener(
    "click",
    function () {
      audioElement.muted = !audioElement.muted;
      if (audioElement.muted) {
        this.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      } else {
        this.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    },
    false
  );

  //volume up
  document.getElementById("volumeHigh").addEventListener(
    "click",
    () => {
      console.log(audioElement.volume);
      audioElement.volume = limitRange(audioElement.volume + 0.1);
    },
    false
  );

  //volume down
  document.getElementById("volumeLow").addEventListener(
    "click",
    () => {
      console.log(audioElement.volume);
      audioElement.volume = limitRange(audioElement.volume - 0.1);
    },
    false
  );
  //back
  document.getElementById("back").addEventListener(
    "click",
    () => {
      audioElement.currentTime = Math.floor(audioElement.currentTime) - 2;
      console.log("audioElement.currentTime", audioElement.currentTime);
    },
    false
  );
  //forward
  document.getElementById("forward").addEventListener(
    "click",
    () => {
      audioElement.currentTime = Math.floor(audioElement.currentTime) + 2;
      console.log("audioElement.currentTime", audioElement.currentTime);
    },
    false
  );
  //speed down
  document.getElementById("speed").addEventListener(
    "click",
    function () {
      speedIndex += 1;
      if (speedIndex > 4) {
        speedIndex = 0;
      }
      audioElement.playbackRate = speedList[speedIndex];
      this.innerHTML =
        '<i class="fa-solid fa-forward"></i>' + "x" + audioElement.playbackRate;
    },
    false
  );

  audioElement.addEventListener("play", (event) => {
    timer = setInterval(() => {
      console.log("audioElement.currentTime", audioElement.currentTime);
      setBar();
    }, 1000);
  });

  document.getElementById("progress").addEventListener(
    "change",
    function (event) {
      console.log("change####", event.target.value);
      audioElement.currentTime = event.target.value;
      setBar();
    },
    false
  );

  audioElement.addEventListener("pause", (event) => {
    console.log("paused", event);
    clearInterval(timer);
  });

  audioElement.addEventListener("ended", (event) => {
    console.log("ended", event);
    clearInterval(timer);
    document.getElementById("timeSpent").innerText = transTime(0);
    document.getElementById("timeLeft").innerText = transTime(
      Math.round(duration)
    );
    progressBar.value = 0;
    document.getElementById("progress-line").style.width = "0%";
    document.getElementById("play").innerHTML = '<i class="fas fa-play"></i>';
  });
};

//mute done
//speed done
