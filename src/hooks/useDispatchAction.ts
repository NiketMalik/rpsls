import React, { useMemo } from "react";

import type { ActionCreator } from "store/types";

import { StoreContext } from "context/storeContext";

export const useDispatchAction = <A extends ActionCreator>(
  actionCreator: A,
): A => {
  const { dispatch } = React.useContext(StoreContext);

  const actionDispatcher = useMemo(() => {
    return (...args: any[]) => dispatch(actionCreator(...args));
  }, [actionCreator, dispatch]);

  return actionDispatcher as any;
};
