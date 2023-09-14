import { AVPlaybackStatusSuccess, Video, VideoProps } from "expo-av";
import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import COLORS from "../styles/colors";
const VideoPlayer = (props: VideoProps) => {
  const ref = useRef<Video>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const PLAY_ICON_SIZE = 48;

  const height = (props as { style: { height: number }[] }).style[1].height;
  const width = (props as { style: { width: number }[] }).style[1].width;

  const toggleVideo = async () => {
    if (!ref.current) return;

    const status =
      (await ref.current.getStatusAsync()) as AVPlaybackStatusSuccess;

    setIsPlaying(!status.isPlaying);
    // prettier-ignore
    // const status = (await ref.current.getStatusAsync()) as AVPlaybackStatusSuccess;

    if (status.isPlaying) await ref.current.pauseAsync();
    else await ref.current.playAsync();
  };

  return (
    <TouchableOpacity onPress={toggleVideo}>
      <Video ref={ref} {...props} />
      {!isPlaying && (
        <Entypo
          name="controller-play"
          size={PLAY_ICON_SIZE}
          color={COLORS.SurfaceContainer}
          style={{
            position: "absolute",
            left: width / 2 - PLAY_ICON_SIZE / 4,
            top: height / 2 - PLAY_ICON_SIZE / 2,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default VideoPlayer;
