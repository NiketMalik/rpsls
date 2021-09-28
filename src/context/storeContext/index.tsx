import React, { createContext, useReducer } from "react";

import { StoreState, StoreAction } from "store/types";

import { reducer } from "store/reducer";

const INITIAL_STATE: StoreState = {
  isAudioEnabled: false,
  isMusicEnabled: false,
};

export const StoreContext = createContext<{
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

export const StoreProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
