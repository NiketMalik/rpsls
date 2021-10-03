import { useCallback, useEffect, useMemo, useState } from "react";

import { MATERIAL_TYPES } from "constants/material";
import { OPPONENT_TYPES, WIN_OUTCOME_TYPES } from "constants/game";

import { useAudio } from "hooks/useAudio";
import { useOpponent } from "hooks/useOpponent";

import { getResult } from "utils/game";

const heartbeatAudio: string = require("static/audio/heartbeat.wav").default,
  materialAudio: string = require("static/audio/material.mp3").default,
  winAudio: string = require("static/audio/win.wav").default,
  loseAudio: string = require("static/audio/lose.wav").default;

export const useBoardActions = () => {
  const [currentPlayerMaterial, setCurrentPlayerMaterial] = useState<
    MATERIAL_TYPES | undefined
  >();
  const [opponentPlayerMaterial, setOpponentPlayerMaterial] = useState<
    MATERIAL_TYPES | undefined
  >();
  const [currentRoundResult, setCurrentRoundResult] = useState<
    WIN_OUTCOME_TYPES | undefined
  >();

  const [playHeartbeat, { stop: stopHeartbeat }] = useAudio(heartbeatAudio, {
    id: "heartbeat",
    loop: true,
  });

  const [playMaterialClick] = useAudio(materialAudio, {
    id: "material",
  });

  const [playOnWin] = useAudio(winAudio, {
    id: "win",
  });

  const [playOnLose] = useAudio(loseAudio, {
    id: "lose",
  });

  const onCurrentPlayerMaterialSelect = useCallback(
    (materialType: MATERIAL_TYPES) => {
      playMaterialClick();
      setCurrentPlayerMaterial(materialType);

      window.gtag("event", "game_action_material_select", {
        event_label: "Game Action",
        event_category: "material_select",
        material: materialType,
      });
    },
    [playMaterialClick],
  );

  const onOpponentPlayerMaterialSelect = useCallback(
    (materialType: MATERIAL_TYPES) => {
      playMaterialClick();
      setOpponentPlayerMaterial(materialType);
    },
    [playMaterialClick],
  );

  const { requestRematch } = useOpponent({
    opponentType: OPPONENT_TYPES.COMPUTER,
    hasCurrentPlayerPlayed: !!currentPlayerMaterial && !currentRoundResult,
    onPlay: onOpponentPlayerMaterialSelect,
  });

  const handleRematch = useCallback(() => {
    window.gtag("event", "game_action_request_rematch", {
      event_label: "Game Action",
      event_category: "rematch",
    });

    return requestRematch().then((accepted) => {
      if (accepted) {
        setCurrentPlayerMaterial(undefined);
        setOpponentPlayerMaterial(undefined);
        setCurrentRoundResult(undefined);
      } else {
        // Notify opponent rejected
      }
    });
  }, [requestRematch]);

  useEffect(() => {
    if (!currentPlayerMaterial) {
      return;
    }

    if (!opponentPlayerMaterial) {
      playHeartbeat();
    } else {
      setCurrentRoundResult(
        getResult(currentPlayerMaterial, opponentPlayerMaterial),
      );
      stopHeartbeat();
    }

    return () => {
      stopHeartbeat();
    };
  }, [
    currentPlayerMaterial,
    opponentPlayerMaterial,
    playHeartbeat,
    stopHeartbeat,
  ]);

  useEffect(() => {
    if (!currentRoundResult) {
      return;
    }

    if (
      currentRoundResult === WIN_OUTCOME_TYPES.CURRENT ||
      currentRoundResult === WIN_OUTCOME_TYPES.DRAW
    ) {
      playOnWin();
    } else {
      playOnLose();
    }

    window.gtag("event", "game_action_match_result", {
      event_label: "Game Action",
      event_category: "result",
      non_interaction: true,
      result: currentRoundResult,
    });
  }, [currentRoundResult, playOnWin, playOnLose]);

  const state = useMemo(() => {
    return {
      isCurrentPlayerHighlited: !!(
        currentRoundResult === WIN_OUTCOME_TYPES.DRAW ||
        currentRoundResult === WIN_OUTCOME_TYPES.CURRENT ||
        (!currentRoundResult && currentPlayerMaterial)
      ),
      isOpponentPlayerHighlited:
        currentRoundResult === WIN_OUTCOME_TYPES.DRAW ||
        currentRoundResult === WIN_OUTCOME_TYPES.OPPONENT,
      currentPlayerMaterial,
      opponentPlayerMaterial,
      currentRoundResult,
      requestRematch: handleRematch,
      onCurrentPlayerMaterialSelect,
    };
  }, [
    currentRoundResult,
    currentPlayerMaterial,
    opponentPlayerMaterial,
    handleRematch,
    onCurrentPlayerMaterialSelect,
  ]);

  return state;
};
