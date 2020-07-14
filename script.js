const video = document.getElementById("video");
const play = document.getElementById("play");
const stop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const fullScreen = document.getElementById("full-screen");
const body = document.querySelector("body");
const button = play.childNodes[1];

const toggleVideo = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updatePlayIcon = () => {
  if (video.paused) {
    button.classList.add("fa-play");
    button.classList.remove("fa-pause");
  } else {
    button.classList.remove("fa-play");
    button.classList.add("fa-pause");
  }
};

video.addEventListener("click", toggleVideo);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
play.addEventListener("click", toggleVideo);

video.addEventListener("timeupdate", (event) => {
  progress.value = (video.currentTime / video.duration) * 100;
  let mins = Math.floor(event.target.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  let secs = Math.floor(event.target.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timestamp.innerHTML = `${mins}:${secs}`;
});

stop.addEventListener("click", () => {
  video.currentTime = 0;
  video.pause();
});

progress.addEventListener("change", (event) => {
  video.currentTime = (+event.target.value * video.duration) / 100;
});

fullScreen.addEventListener("click", () => {
  body.requestFullscreen();
});

body.addEventListener("fullscreenchange",(event)=>{
  console.log(event)
  if(document.webkitIsFullScreen){
    video.style.width = screen.width + "px";
    video.style.height = screen.height + "px";
  }else{
    video.style.height='';
    video.style.width="60%"
  }
})