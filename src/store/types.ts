import { STORE_ACTION_TYPES } from "./actionTypes";

export interface StoreState {
  isAudioEnabled: boolean;
  isMusicEnabled: boolean;
}

export interface StoreAction {
  type: STORE_ACTION_TYPES;
  payload: Record<string, any>;
}

export type ActionCreator = (...args: any[]) => StoreAction;
