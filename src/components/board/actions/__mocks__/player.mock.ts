import { PlayCallback } from "services/player/types";

import { MATERIAL_TYPES } from "constants/material";

export class MockPlayerDefault {
  callback?: PlayCallback;

  getMove() {
    this.callback?.(MATERIAL_TYPES.ROCK);
  }

  onPlay(callback?: PlayCallback) {
    this.callback = callback;
  }

  requestRematch() {
    return Promise.resolve(true);
  }
}
