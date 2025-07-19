import { Composition } from "remotion";
import RemotionVidio from "./RemotionVidio";

export const RemotionRoot = () => {
  return (
    <Composition
      id="RemotionVidio"
      component={RemotionVidio}
      durationInFrames={300}
      fps={30}
      width={720}
      height={1280}
      
      defaultProps={{
        content: [],
        audioUrl: null,
      }}
    />
  );
};
