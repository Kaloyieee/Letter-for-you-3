const music = document.getElementById("anniversaryAudio");
const musicButton = document.getElementById("musicButton");
const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

let isPlaying = false;

// Update the music button
function updateMusicButton(playing) {
  isPlaying = playing;

  if (musicButton) {
    musicButton.textContent = playing ? "Ⅱ" : "▶";
    musicButton.setAttribute(
      "aria-label",
      playing ? "Pause anniversary music" : "Play anniversary music"
    );
  }
}

// Attempt autoplay when the website opens
async function autoplayMusic() {
  if (!music) return;

  music.volume = 0.7;

  try {
    await music.play();
    updateMusicButton(true);
  } catch (error) {
    console.log(
      "Autoplay was blocked. Music will start after the visitor interacts with the page."
    );
  }
}

// Play or pause using the music button
if (musicButton && music) {
  musicButton.addEventListener("click", async () => {
    if (isPlaying) {
      music.pause();
      updateMusicButton(false);
    } else {
      try {
        await music.play();
        updateMusicButton(true);
      } catch (error) {
        console.error("Unable to play music:", error);
      }
    }
  });
}

// Keep button state synchronized with audio
if (music) {
  music.addEventListener("play", () => updateMusicButton(true));
  music.addEventListener("pause", () => updateMusicButton(false));
  music.addEventListener("ended", () => updateMusicButton(false));
}

// Reveal the surprise message
if (surpriseButton && surpriseMessage) {
  surpriseButton.addEventListener("click", () => {
    surpriseMessage.hidden = false;
    surpriseButton.textContent = "I mean every word ♡";
    surpriseButton.disabled = true;
  });
}

// Start attempting autoplay after the page loads
if (document.readyState === "complete") {
  autoplayMusic();
} else {
  window.addEventListener("load", autoplayMusic);
}

// If autoplay is blocked, start music on the visitor's first interaction
async function startOnFirstInteraction() {
  if (!music || isPlaying) return;

  try {
    await music.play();
    updateMusicButton(true);

    document.removeEventListener("click", startOnFirstInteraction);
    document.removeEventListener("touchstart", startOnFirstInteraction);
    document.removeEventListener("keydown", startOnFirstInteraction);
  } catch (error) {
    console.log("Music needs another interaction to start.");
  }
}

document.addEventListener("click", startOnFirstInteraction);
document.addEventListener("touchstart", startOnFirstInteraction);
document.addEventListener("keydown", startOnFirstInteraction);
