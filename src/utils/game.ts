import { RULES } from "constants/rules";
import { WIN_OUTCOME_TYPES } from "constants/game";
import { MATERIAL_TYPES } from "constants/material";

export const getResult = (
  currentPlayerMaterial: MATERIAL_TYPES,
  opponentPlayerMaterial: MATERIAL_TYPES,
) => {
  if (currentPlayerMaterial === opponentPlayerMaterial) {
    return WIN_OUTCOME_TYPES.DRAW;
  } else if (
    RULES[currentPlayerMaterial].beats.includes(opponentPlayerMaterial)
  ) {
    return WIN_OUTCOME_TYPES.CURRENT;
  } else {
    return WIN_OUTCOME_TYPES.OPPONENT;
  }
};

export const getResultText = (result: WIN_OUTCOME_TYPES) => {
  if (result === WIN_OUTCOME_TYPES.DRAW) {
    return "It's a draw!";
  } else if (result === WIN_OUTCOME_TYPES.CURRENT) {
    return "You won!";
  } else if (result === WIN_OUTCOME_TYPES.OPPONENT) {
    return "You lost...";
  } else {
    throw new Error("GameUtils: Invalid result outcome.");
  }
};
