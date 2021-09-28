import type { StoreState, StoreAction } from "./types";

import { STORE_ACTION_TYPES } from "./actionTypes";

export function setIsAudioEnabledAction(
  isAudioEnabled: StoreState["isAudioEnabled"],
): StoreAction {
  return {
    type: STORE_ACTION_TYPES.SET_IS_AUDIO_ENABLED,
    payload: { isAudioEnabled },
  };
}

export function setIsMusicEnabledAction(
  isMusicEnabled: StoreState["isMusicEnabled"],
): StoreAction {
  return {
    type: STORE_ACTION_TYPES.SET_IS_MUSIC_ENABLED,
    payload: { isMusicEnabled },
  };
}
