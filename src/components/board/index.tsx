import React from "react";

import { useBoardActions } from "./actions/useBoardActions";
import { useMediaQuery } from "react-responsive";

import { getResultText } from "utils/game";

import { Row, Col } from "react-bootstrap";
import { AnimatePresence, m } from "framer-motion";
import { Material, DEFAULT_RADIUS } from "components/material";
import { MaterialSelector } from "./components/materialSelector";

import { BoardContainer } from "./styles";

const AnimatedRow = m(Row),
  AnimatedCol = m(Col);

const OPACITY_ANIMATION_PROPS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const SCALE_ANIMATION_PROPS = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};

export const Board = () => {
  const {
    currentPlayerMaterial,
    opponentPlayerMaterial,
    isCurrentPlayerHighlited,
    isOpponentPlayerHighlited,
    currentRoundResult,
    requestRematch,
    onCurrentPlayerMaterialSelect,
  } = useBoardActions();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const materialRadius = isTabletOrMobile
    ? DEFAULT_RADIUS * 0.5
    : DEFAULT_RADIUS;

  return (
    <BoardContainer
      fluid
      className="p-5 mt-md-4 d-flex flex-column"
      data-testid="board"
    >
      <Row className="row flex-grow-1 align-items-center">
        <Col md={12}>
          <AnimatePresence exitBeforeEnter>
            {currentPlayerMaterial ? (
              <AnimatedRow
                key="play"
                className="px-md-5"
                {...OPACITY_ANIMATION_PROPS}
                data-testid="current-player-selection"
              >
                <AnimatedCol
                  md={6}
                  className="d-flex align-items-center justify-content-center mt-5 mt-md-0"
                  {...SCALE_ANIMATION_PROPS}
                >
                  <Material
                    type={currentPlayerMaterial}
                    radius={materialRadius * 1.25}
                    isHighlited={isCurrentPlayerHighlited}
                    isDisabled={!!currentRoundResult}
                  />
                </AnimatedCol>
                {currentPlayerMaterial && (
                  <AnimatedCol
                    md={6}
                    className="d-flex align-items-center justify-content-center mt-5 mt-md-0"
                    {...SCALE_ANIMATION_PROPS}
                    data-testid="opponent-player-selection"
                  >
                    <Material
                      type={opponentPlayerMaterial}
                      radius={materialRadius * 1.25}
                      isHighlited={isOpponentPlayerHighlited}
                      isDisabled={!!currentRoundResult}
                    />
                  </AnimatedCol>
                )}
              </AnimatedRow>
            ) : (
              <AnimatedRow
                key="material-selector"
                className="justify-content-evenly row-cols-auto"
                layout
                {...SCALE_ANIMATION_PROPS}
              >
                <MaterialSelector
                  radius={materialRadius}
                  onSelect={onCurrentPlayerMaterialSelect}
                  data-testid="material-selector"
                />
              </AnimatedRow>
            )}
          </AnimatePresence>
        </Col>
      </Row>
      <div className="row py-4 font-cursive">
        {currentRoundResult ? (
          <div className="col-md-12 d-flex align-items-center justify-content-center">
            <div className="row">
              <div className="col-md-12 text-center">
                <p className="display-5 my-2">
                  {getResultText(currentRoundResult)}
                </p>
              </div>
              <AnimatePresence>
                <m.div
                  className="col-md-12 text-center"
                  transition={{ delay: 0.25, type: "spring", duration: 0.25 }}
                  {...SCALE_ANIMATION_PROPS}
                >
                  <button
                    className="fs-5"
                    onClick={requestRematch}
                    data-testid="rematch"
                  >
                    Rematch?
                  </button>
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        ) : currentPlayerMaterial ? (
          <>
            <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center">
              <p className="display-5 my-2">Your move</p>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-center">
              <p className="display-5 my-2">
                {opponentPlayerMaterial ? "Opponent's move" : "waiting..."}
              </p>
            </div>
          </>
        ) : (
          <div className="col-md-12 d-flex align-items-center justify-content-center">
            <p className="display-5 my-2">Your turn</p>
          </div>
        )}
      </div>
    </BoardContainer>
  );
};
