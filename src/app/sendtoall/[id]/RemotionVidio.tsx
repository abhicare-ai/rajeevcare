"use client";
import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  Audio,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const AnimatedImage = ({ src }: { src: string }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // 👈 yeh naya add karo

  const opacity = spring({
    frame,
    fps, // ✅ required now
    from: 0,
    to: 1,
    config: {
      damping: 200,
      mass: 0.5,
      stiffness: 100,
    },
  });

   // Zoom in-out loop: oscillate between 1.02 ↔ 1.07
  const loopedScale = interpolate(
    Math.sin(frame / 30),
    [-1, 1],
    // [1.02, 1.07]
    [1.02,1.30]
  );

  return (
    <Img
      src={src}
      style={{
        opacity,
        transform: `scale(${loopedScale})`,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
};

export default function RemotionVidio({ frams, audioDuration }: any) {
  const totalFrames = Math.floor(audioDuration * 30);
  const images = frams.img || [];
  const totalImages = images.length;
  const framesPerImage = Math.floor(totalFrames / totalImages);

  return (
    <AbsoluteFill className="bg-black">
      {images.map((item: any, index: number) => {
        const from = index * framesPerImage;
        const isLast = index === totalImages - 1;
        const durationInFrames = isLast ? totalFrames - from : framesPerImage;

        return (
          <Sequence key={index} from={from} durationInFrames={durationInFrames}>
            <AnimatedImage src={item.publicUrl} />
          </Sequence>
        );
      })}

      <Audio src={frams.filePath} />
    </AbsoluteFill>
  );
}
