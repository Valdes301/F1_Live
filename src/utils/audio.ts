// Synthesized F1 sound alerts using Web Audio API (no external asset needed)

class F1SoundEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Plays the iconic F1 5-red-lights sequence followed by green lights chime
   */
  public playLightsOutChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // 5 Red Lights beeps
      for (let i = 0; i < 5; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now + i * 0.25); // A5

        gain.gain.setValueAtTime(0.08, now + i * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.25 + 0.12);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.25);
        osc.stop(now + i * 0.25 + 0.15);
      }

      // Lights out high chime
      const greenOsc = this.ctx.createOscillator();
      const greenGain = this.ctx.createGain();

      greenOsc.type = 'triangle';
      greenOsc.frequency.setValueAtTime(1760, now + 1.6); // A6

      greenGain.gain.setValueAtTime(0.12, now + 1.6);
      greenGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.3);

      greenOsc.connect(greenGain);
      greenGain.connect(this.ctx.destination);

      greenOsc.start(now + 1.6);
      greenOsc.stop(now + 2.4);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  /**
   * Team Radio Alert Beep (for 30m / 15m notification)
   */
  public playRadioNotification() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }
}

export const f1Audio = new F1SoundEngine();
