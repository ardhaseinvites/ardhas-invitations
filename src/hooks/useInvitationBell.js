import { useEffect, useRef, useState } from "react";

export default function useInvitationBell() {
  const [sound, setSound] = useState(false);
  const context = useRef(null);
  useEffect(
    () => () => {
      context.current?.close().catch(() => {});
    },
    [],
  );
  const ring = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      context.current ||= new AudioContext();
      await context.current.resume();
      [523.25, 1046.5, 1569.75].forEach((frequency, index) => {
        const oscillator = context.current.createOscillator();
        const gain = context.current.createGain();
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(
          0.025 / (index + 1),
          context.current.currentTime,
        );
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          context.current.currentTime + 2.4,
        );
        oscillator.connect(gain);
        gain.connect(context.current.destination);
        oscillator.start();
        oscillator.stop(context.current.currentTime + 2.5);
        oscillator.onended = () => {
          oscillator.disconnect();
          gain.disconnect();
        };
      });
    } catch {
      setSound(false);
    }
  };
  const toggle = () => {
    if (!sound) ring();
    else context.current?.suspend().catch(() => {});
    setSound(!sound);
  };
  return { sound, toggle, ring };
}
