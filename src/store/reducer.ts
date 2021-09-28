import type { StoreState, StoreAction } from "./types";

import { STORE_ACTION_TYPES } from "./actionTypes";

export const reducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case STORE_ACTION_TYPES.SET_IS_AUDIO_ENABLED: {
      state = {
        ...state,
        isAudioEnabled: action.payload.isAudioEnabled,
      };

      break;
    }
    case STORE_ACTION_TYPES.SET_IS_MUSIC_ENABLED: {
      state = {
        ...state,
        isMusicEnabled: action.payload.isMusicEnabled,
      };

      break;
    }
  }

  return state;
};
