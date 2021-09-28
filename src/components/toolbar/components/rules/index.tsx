import { memo, lazy, useCallback, useState, Suspense } from "react";

import { OverlayTrigger, Tooltip, Image, Button } from "react-bootstrap";

import instructionsIcon from "static/images/icon-instructions.svg";
import rulesImage from "static/images/rules.svg";

const Modal = lazy(() => import("react-bootstrap/Modal"));
const ModalBody = lazy(() => import("react-bootstrap/ModalBody"));

export const Rules = memo(() => {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  const handleShow = useCallback(() => setIsRulesModalOpen(true), []);

  const handleClose = useCallback(() => setIsRulesModalOpen(false), []);

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={(props) => (
          <Tooltip id="toolbar-rules-tooltip" {...props}>
            Game rules
          </Tooltip>
        )}
      >
        <Button variant="trasnparent" aria-label="rules" onClick={handleShow}>
          <Image width="32" height="32" src={instructionsIcon} alt="rules" />
        </Button>
      </OverlayTrigger>

      <Suspense fallback={<div />}>
        <Modal
          backdrop
          show={isRulesModalOpen}
          onHide={handleClose}
          keyboard={true}
        >
          <ModalBody>
            <div className="d-flex flex-column align-items-center">
              <div className="display-6">Rules</div>
              <Image
                fluid
                className="p-4"
                width="100%"
                src={rulesImage}
                alt="rules"
              />
            </div>
          </ModalBody>
        </Modal>
      </Suspense>
    </>
  );
});
