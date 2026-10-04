// Web Audio Synthesizer Engine for Game SFX

let sharedAudioCtx: AudioContext | null = null;
let masterLimiter: DynamicsCompressorNode | null = null;

function getAudioContext(): AudioContext {
  if (!sharedAudioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    sharedAudioCtx = new AudioContextClass();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
}

function getAudioMaster(): DynamicsCompressorNode {
  const ctx = getAudioContext();
  if (!masterLimiter) {
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.setValueAtTime(-14, ctx.currentTime);
    comp.knee.setValueAtTime(8, ctx.currentTime);
    comp.ratio.setValueAtTime(4, ctx.currentTime);
    comp.attack.setValueAtTime(0.005, ctx.currentTime);
    comp.release.setValueAtTime(0.12, ctx.currentTime);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.35, ctx.currentTime);
    comp.connect(masterGain);
    masterGain.connect(ctx.destination);
    masterLimiter = comp;
  }
  return masterLimiter;
}

export const playMenuSelectSound = () => {
  try {
    const ctx = getAudioContext();
    const master = getAudioMaster();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.09);

    const oscSparkle = ctx.createOscillator();
    const gainSparkle = ctx.createGain();
    oscSparkle.type = 'sine';
    oscSparkle.frequency.setValueAtTime(1046, now);
    gainSparkle.gain.setValueAtTime(0.06, now);
    gainSparkle.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    oscSparkle.connect(gainSparkle);
    gainSparkle.connect(master);
    oscSparkle.start(now);
    oscSparkle.stop(now + 0.06);
  } catch {}
};

export const playItemClickSound = () => {
  try {
    const ctx = getAudioContext();
    const master = getAudioMaster();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.08);
  } catch {}
};

export const playCheckClickSound = () => {
  try {
    const ctx = getAudioContext();
    const master = getAudioMaster();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, now);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.07);
  } catch {}
};

export const playCorrectSound = () => {
  try {
    const ctx = getAudioContext();
    const master = getAudioMaster();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      const startTime = now + i * 0.09;
      const duration = (i === notes.length - 1) ? 0.38 : 0.20;
      gain.gain.setValueAtTime(0.14, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(master);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });

    const bell = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bell.type = 'triangle';
    bell.frequency.setValueAtTime(2093, now + 0.27);
    bellGain.gain.setValueAtTime(0.07, now + 0.27);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
    bell.connect(bellGain);
    bellGain.connect(master);
    bell.start(now + 0.27);
    bell.stop(now + 0.55);
  } catch {}
};

export const playWrongSound = () => {
  try {
    const ctx = getAudioContext();
    const master = getAudioMaster();
    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(320, now);
    osc1.frequency.exponentialRampToValueAtTime(290, now + 0.12);
    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    osc1.connect(gain1);
    gain1.connect(master);
    osc1.start(now);
    osc1.stop(now + 0.14);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(240, now + 0.12);
    osc2.frequency.exponentialRampToValueAtTime(160, now + 0.32);
    gain2.gain.setValueAtTime(0.14, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc2.connect(gain2);
    gain2.connect(master);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.35);
  } catch {}
};

export const playApplauseSound = () => {
  try {
    const ctx = getAudioContext();
    const master = getAudioMaster();
    const fanfareNotes = [261.63, 329.63, 392.00, 523.25];
    fanfareNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      const startTime = ctx.currentTime + i * 0.1;
      const duration = (i === fanfareNotes.length - 1) ? 0.5 : 0.12;
      gain.gain.setValueAtTime(0.14, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gain);
      gain.connect(master);
      osc.start(startTime);
      osc.stop(startTime + duration);
    });

    const bufferSize = ctx.sampleRate * 1.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1100;
    filter.Q.value = 0.9;
    const noiseGain = ctx.createGain();
    const now = ctx.currentTime + 0.35;
    noiseGain.gain.setValueAtTime(0.01, now);
    noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.25);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(now);
    noise.stop(now + 1.8);
  } catch {}
};
