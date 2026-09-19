import { LottieLight } from "lottie-react";

const petals = Array.from({ length: 8 }, (_, index) => ({
  ty: "gr",
  it: [
    {
      ty: "el",
      p: { a: 0, k: [0, -25] },
      s: { a: 0, k: [15, 34] },
      nm: "Petal",
    },
    {
      ty: "fl",
      c: { a: 0, k: [0.75, 0.59, 0.32, 1] },
      o: { a: 0, k: 85 },
      r: 1,
    },
    {
      ty: "tr",
      p: { a: 0, k: [0, 0] },
      a: { a: 0, k: [0, 0] },
      s: { a: 0, k: [100, 100] },
      r: { a: 0, k: index * 45 },
      o: { a: 0, k: 100 },
    },
  ],
  nm: `Petal ${index + 1}`,
}));
const animationData = {
  v: "5.9.6",
  fr: 30,
  ip: 0,
  op: 90,
  w: 120,
  h: 120,
  nm: "Ardhas rangoli",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Bloom",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: { a: 0, k: 0 },
        p: { a: 0, k: [60, 60, 0] },
        a: { a: 0, k: [0, 0, 0] },
        s: {
          a: 1,
          k: [
            {
              t: 0,
              s: [0, 0, 100],
              e: [100, 100, 100],
              i: { x: [0.67, 0.67, 0.67], y: [1, 1, 1] },
              o: { x: [0.33, 0.33, 0.33], y: [0, 0, 0] },
            },
            { t: 40, s: [100, 100, 100] },
          ],
        },
      },
      shapes: petals,
      ip: 0,
      op: 90,
      st: 0,
      bm: 0,
    },
  ],
};

export default function CelebrationMark() {
  return (
    <LottieLight
      className="hw-celebration-mark"
      src={animationData}
      autoplay
      loop={false}
      aria-hidden="true"
    />
  );
}
