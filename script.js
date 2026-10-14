const music = document.getElementById("anniversaryAudio");
const musicButton = document.getElementById("musicButton");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

let isPlaying = false;

musicButton.addEventListener("click", async () => {
  if (!music) return;
  if (isPlaying) {
    music.pause();
    isPlaying = false;
    musicButton.textContent = "▶";
    musicButton.setAttribute("aria-label", "Play anniversary music");
    return;
  }

  try {
    await music.play();
    isPlaying = true;
    musicButton.textContent = "Ⅱ";
    musicButton.setAttribute("aria-label", "Pause anniversary music");
  } catch (error) {
    alert("Add your legally obtained MP3 as assets/our-song.mp3, then try again. Browsers also require a click before playing audio.");
  }
});

music.addEventListener("ended", () => {
  isPlaying = false;
  musicButton.textContent = "▶";
});

surpriseButton.addEventListener("click", () => {
  surpriseMessage.hidden = false;
  surpriseButton.textContent = "I mean every word ♡";
  surpriseButton.disabled = true;
});
