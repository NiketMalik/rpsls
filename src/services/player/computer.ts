import { PlayCallback } from "./types";

import { MATERIAL_TYPES } from "constants/material";

export class Computer {
  callback?: PlayCallback;

  private getRandomMaterial(): MATERIAL_TYPES {
    const materials = Object.keys(MATERIAL_TYPES);

    return materials[
      Math.floor(Math.random() * 1e2) % materials.length
    ] as MATERIAL_TYPES;
  }

  getMove() {
    setTimeout(() => {
      this.callback?.(this.getRandomMaterial());
    }, 2000 + Math.floor(Math.random() * 1e3));
  }

  onPlay(callback?: PlayCallback) {
    this.callback = callback;
  }

  requestRematch() {
    return Promise.resolve(true);
  }
}
