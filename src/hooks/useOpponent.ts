import { useEffect, useMemo, useState } from "react";

import { MATERIAL_TYPES } from "constants/material";
import { OPPONENT_TYPES } from "constants/game";

import { Computer } from "services/player/computer";

interface UseOpponentProps {
  opponentType: OPPONENT_TYPES;
  hasCurrentPlayerPlayed: boolean;
  onPlay?: (materialType: MATERIAL_TYPES) => void;
}

const OPPONENT_TYPES_CLASS_MAP = {
  [OPPONENT_TYPES.COMPUTER]: Computer,
};

export const useOpponent = ({
  opponentType,
  hasCurrentPlayerPlayed,
  onPlay,
}: UseOpponentProps) => {
  const [Opponent] = useState(new OPPONENT_TYPES_CLASS_MAP[opponentType]());

  useEffect(() => {
    if (hasCurrentPlayerPlayed) {
      Opponent.getMove();
    }
  }, [Opponent, hasCurrentPlayerPlayed]);

  useEffect(() => {
    Opponent.onPlay(onPlay);

    return () => {
      Opponent.onPlay(undefined);
    };
  }, [Opponent, onPlay]);

  const state = useMemo(
    () => ({
      requestRematch: Opponent.requestRematch,
    }),
    [Opponent.requestRematch],
  );

  return state;
};
