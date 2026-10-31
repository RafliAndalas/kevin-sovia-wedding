/**
 * Wedding Invitation Audio Controller
 * Handles background music playback with HTML5 Audio and Web Audio API fallback.
 */

class WeddingAudioManager {
  constructor() {
    this.isPlaying = false;
    this.audioElement = null;
    this.audioCtx = null;
    this.synthInterval = null;
    this.isUsingSynth = false;

    // Romantic royalty-free wedding audio track
    this.audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=romantic-wedding-piano-113271.mp3";
    this.initAudioElement();
  }

  initAudioElement() {
    this.audioElement = new Audio();
    this.audioElement.src = this.audioSrc;
    this.audioElement.loop = true;
    this.audioElement.volume = 0.55;

    // Handle error by switching to Web Audio synthesized melody
    this.audioElement.addEventListener('error', () => {
      console.warn("External wedding audio stream unavailable; switching to Web Audio procedural romantic chime.");
      this.isUsingSynth = true;
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  play() {
    if (this.isPlaying) return;

    if (!this.isUsingSynth && this.audioElement) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateUI(true);
          })
          .catch((err) => {
            console.log("Audio autoplay policy or stream error, using procedural synth fallback:", err);
            this.startSynthMelody();
            this.isPlaying = true;
            this.updateUI(true);
          });
      }
    } else {
      this.startSynthMelody();
      this.isPlaying = true;
      this.updateUI(true);
    }
  }

  pause() {
    if (!this.isPlaying) return;

    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynthMelody();
    this.isPlaying = false;
    this.updateUI(false);
  }

  startSynthMelody() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      // Romantic chord notes (D major pentatonic / Canon in D inspired notes: D4, F#4, A4, B4, C#5, D5, E5)
      const frequencies = [
        293.66, 369.99, 440.00, 493.88, 554.37, 587.33, 659.25, 739.99
      ];
      
      const playChime = (freq, duration = 2.4, gainLevel = 0.08) => {
        if (!this.audioCtx) return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        // Warm sine + triangle blend
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + duration);
      };

      let noteIdx = 0;
      const sequence = [0, 2, 4, 5, 3, 2, 1, 0, 4, 6, 5, 2];

      const step = () => {
        if (!this.isPlaying) return;
        const fIndex = sequence[noteIdx % sequence.length];
        playChime(frequencies[fIndex], 2.8, 0.09);
        // Play harmony fifth
        if (noteIdx % 2 === 0) {
          playChime(frequencies[(fIndex + 2) % frequencies.length] * 0.5, 3.5, 0.05);
        }
        noteIdx++;
      };

      step();
      this.synthInterval = setInterval(step, 1400);
      this.isUsingSynth = true;
    } catch (e) {
      console.warn("Web Audio not supported:", e);
    }
  }

  stopSynthMelody() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
  }

  updateUI(playing) {
    const musicBtn = document.getElementById('music-toggle-btn');
    const vinylIcon = document.getElementById('music-vinyl');
    const soundWaves = document.getElementById('music-soundwave');
    const musicStatusText = document.getElementById('music-status-text');

    if (musicBtn) {
      if (playing) {
        musicBtn.setAttribute('title', 'Jeda Musik');
        if (vinylIcon) vinylIcon.classList.remove('paused');
        if (soundWaves) soundWaves.classList.add('sound-wave-active');
        if (musicStatusText) musicStatusText.textContent = 'Memutar Lagu Romantis';
      } else {
        musicBtn.setAttribute('title', 'Putar Musik');
        if (vinylIcon) vinylIcon.classList.add('paused');
        if (soundWaves) soundWaves.classList.remove('sound-wave-active');
        if (musicStatusText) musicStatusText.textContent = 'Musik Dijeda';
      }
    }
  }
}

// Global instance
window.weddingAudio = new WeddingAudioManager();
