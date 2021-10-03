import { memo, lazy, useCallback, useState, Suspense } from "react";

import { OverlayTrigger, Tooltip, Image, Button } from "react-bootstrap";

import instructionsIcon from "static/images/icon-instructions.svg";
import rulesImage from "static/images/rules.svg";

const Modal = lazy(() => import("react-bootstrap/Modal"));
const ModalBody = lazy(() => import("react-bootstrap/ModalBody"));

export const Rules = memo(() => {
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  const handleShow = useCallback(() => {
    setIsRulesModalOpen(true);

    window.gtag("event", "toolbar_action_open_rules_modal", {
      event_label: "Toolbar Action",
      event_category: "toolbar",
    });
  }, []);

  const handleClose = useCallback(() => {
    setIsRulesModalOpen(false);

    window.gtag("event", "toolbar_action_close_rules_modal", {
      event_label: "Toolbar Action",
      event_category: "toolbar",
    });
  }, []);

  return (
    <>
      <OverlayTrigger
        placement="top"
        overlay={(props) => (
          <Tooltip
            id="toolbar-rules-tooltip"
            {...props}
            data-testid="rules-modal-trigger-tooltip"
          >
            Game rules
          </Tooltip>
        )}
      >
        <Button
          variant="trasnparent"
          aria-label="rules"
          onClick={handleShow}
          data-testid="rules-modal-trigger"
        >
          <Image width="32" height="32" src={instructionsIcon} alt="rules" />
        </Button>
      </OverlayTrigger>

      <Suspense fallback={<div />}>
        <Modal
          backdrop
          show={isRulesModalOpen}
          onHide={handleClose}
          keyboard={true}
          data-testid="rules-modal"
        >
          <ModalBody data-testid="rules-modal-content">
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
