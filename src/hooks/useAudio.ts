import type { StoreState } from "store/types";

import useSound from "use-sound";
import { useSelector } from "hooks/useSelector";

const getIsAudioEnabled = (state: StoreState) => state.isAudioEnabled;
const getIsMusicEnabled = (state: StoreState) => state.isMusicEnabled;

interface Options {
  id: string;
  isAudio?: boolean;
  loop?: boolean;
  volume?: number;
}

export const useAudio = (src: string, options: Options) => {
  const isAudioEnabled = useSelector(getIsAudioEnabled),
    isMusicEnabled = useSelector(getIsMusicEnabled);

  return useSound(src, {
    soundEnabled: options.isAudio ? isAudioEnabled : isMusicEnabled,
    ...options,
  });
};
