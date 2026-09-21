/**
 * Deadpool Easter egg quotes — each entry has a quote string and a sound "mood"
 * that maps to a Web Audio API tone pattern. No audio files needed.
 *
 * Sound moods:
 *   "zap"   — electric crackle (high freq burst)
 *   "sword" — metallic ring (mid freq with decay)
 *   "swoosh"— air-cut rush (noise sweep down)
 *   "chimichanga" — ascending comic "dun dun DUN"
 *   "pop"   — cartoon pop (short sine burst)
 */

export type SoundMood = 'zap' | 'sword' | 'swoosh' | 'chimichanga' | 'pop';

export interface DeadpoolQuote {
  text: string;
  mood: SoundMood;
}

export const DEADPOOL_QUOTES: DeadpoolQuote[] = [
  {
    text: "Oh SNAP. You found the secret button. 🫵💥 I'm so proud. A little scared, but proud.",
    mood: 'zap',
  },
  {
    text: "🌯 Chimichanga time! Seriously though — JOIN THE COMMUNITY before I eat it all.",
    mood: 'chimichanga',
  },
  {
    text: "⚔️ *sword unsheathing intensifies* Did you just… poke me? RUDE. Also hi.",
    mood: 'sword',
  },
  {
    text: "🎬 You broke the fourth wall. AGAIN. Some of us live here, you know.",
    mood: 'pop',
  },
  {
    text: "📺 Loading Deadpool's Big Brain Thought… 🤔 … Nah. Just go join the club.",
    mood: 'swoosh',
  },
  {
    text: "🩸 Red suit — so villains can't see me bleed. Also so I don't have to do laundry.",
    mood: 'zap',
  },
  {
    text: "🫶 With great power comes a great need for chimis and a student ID card. Apply NOW.",
    mood: 'chimichanga',
  },
  {
    text: "💀 Error 404: Serious club website not found. You're stuck with this one. Sorry not sorry.",
    mood: 'pop',
  },
  {
    text: "🎯 10/10 precision click. Honestly? Community material. 🤌 Submit the form already.",
    mood: 'sword',
  },
  {
    text: "🦸 Wolverine thinks I'm embarrassing. Wolverine also wears yellow spandex. Just saying.",
    mood: 'swoosh',
  },
  {
    text: "🌀 Wait— are you… reading this at 3 AM? Bestie. Same. Let's be weird together in the community.",
    mood: 'zap',
  },
  {
    text: "🔔 *clears throat* MAXIMUM EFFORT. That's it. That's the entire philosophy. You're ready.",
    mood: 'chimichanga',
  },
  {
    text: "🎪 Welcome to the DC Community — where nerds become legends and coffee is currency. 💸",
    mood: 'pop',
  },
  {
    text: "⚡ Every great hero has an origin story. Yours starts… here. With this button. Right now.",
    mood: 'sword',
  },
];

export function getRandomDeadpoolQuote(
  currentQuote?: DeadpoolQuote | null
): DeadpoolQuote {
  const filtered = DEADPOOL_QUOTES.filter((q) => q.text !== currentQuote?.text);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

/** Play a short Web Audio API tone matching the mood. Fire-and-forget. */
export function playMoodSound(mood: SoundMood): void {
  try {
    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    switch (mood) {
      case 'zap': {
        // Electric crackle: noise burst + high-freq sine
        const bufLen = ctx.sampleRate * 0.18;
        const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufLen * 0.15));
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filt = ctx.createBiquadFilter();
        filt.type = 'highpass';
        filt.frequency.value = 3000;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.28, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        src.connect(filt);
        filt.connect(gain);
        gain.connect(ctx.destination);
        src.start();
        src.stop(ctx.currentTime + 0.2);
        break;
      }

      case 'sword': {
        // Metallic ring: two oscillators detuned for shimmer
        [440, 660, 880].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq + i * 3;
          gain.gain.setValueAtTime(0.18 / (i + 1), ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.55);
        });
        break;
      }

      case 'swoosh': {
        // Air rush: filtered noise sweeping down
        const bufLen = ctx.sampleRate * 0.22;
        const buf = ctx.createBuffer(1, bufLen, ctx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufLen; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufLen) * Math.PI);
        }
        const src = ctx.createBufferSource();
        src.buffer = buf;
        const filt = ctx.createBiquadFilter();
        filt.type = 'bandpass';
        filt.frequency.setValueAtTime(2200, ctx.currentTime);
        filt.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.22);
        filt.Q.value = 2.5;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        src.connect(filt);
        filt.connect(gain);
        gain.connect(ctx.destination);
        src.start();
        src.stop(ctx.currentTime + 0.28);
        break;
      }

      case 'chimichanga': {
        // Comic ascending "dun dun DUN"
        const notes = [220, 277, 370];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.value = freq;
          const t = ctx.currentTime + i * 0.14;
          gain.gain.setValueAtTime(0, t);
          gain.gain.linearRampToValueAtTime(0.15, t + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.25);
        });
        break;
      }

      case 'pop': {
        // Cartoon pop: quick sine burst
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.35, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
        break;
      }
    }

    // Close the context after a safe buffer to release resources
    setTimeout(() => ctx.close(), 800);
  } catch {
    // AudioContext may be blocked before user gesture — silently ignore
  }
}
