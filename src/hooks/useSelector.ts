import React from "react";

import type { StoreState } from "store/types";

import { StoreContext } from "context/storeContext";

export const useSelector = <T = unknown>(
  selector: (state: StoreState) => T,
): T => {
  const { state } = React.useContext(StoreContext);

  return selector(state);
};
