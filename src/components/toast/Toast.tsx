import React, { useState, useEffect, useMemo, useCallback } from "react";
import hyperid from "hyperid";
import classnames from "classnames";
import { assoc, omit, clone } from "ramda";

import type { ToastItemProps } from "./types";

import { AnimatePresence, m } from "framer-motion";
import { Toast as BSToast } from "react-bootstrap";

import {
  ToastWrapper,
  ToastContainer,
  ToastItem as ToastItemContainer,
} from "./styles";

interface CloseButtonProps {
  accent: ToastItemProps["accent"];
  onClick: () => void;
}

const renderCloseButton = ({ accent, onClick }: CloseButtonProps) => (
  <button
    type="button"
    className={classnames("btn-close me-2 m-auto", {
      "btn-close-white": accent !== "secondary",
    })}
    data-bs-dismiss="toast"
    aria-label="Close"
    onClick={onClick}
    data-testid="toast-close-action"
  />
);

const Toast = React.memo(() => {
  const [toastItemList, setToastItemList] = useState<
    Record<string, ToastItemProps>
  >({});

  const removeItem = useCallback((id: string) => {
    setToastItemList((toastItemList) => omit([id], toastItemList));
  }, []);

  const toggle = useCallback(
    (id: string, show: boolean) => {
      setToastItemList((toastItemList) =>
        assoc(
          id,
          {
            ...toastItemList[id],
            show,
          },
          toastItemList,
        ),
      );

      /* istanbul ignore else */
      if (!show) {
        removeItem(id);
      }
    },
    [removeItem],
  );

  const addItem = useCallback((item: ToastItemProps) => {
    const id = hyperid().uuid;
    const clonedItem = clone(item);
    clonedItem.accent = clonedItem.accent ? clonedItem.accent : "secondary";

    setToastItemList((toastItemList) => assoc(id, clonedItem, toastItemList));
  }, []);

  useEffect(() => {
    window.showToast = (item: ToastItemProps) => {
      addItem(item);
    };
  }, [addItem]);

  const toastItems = useMemo(() => {
    return Object.entries(toastItemList).map(
      ([id, { show, accent, header, body, autohide = true }]) => {
        const closeButton = renderCloseButton({
          accent,
          onClick: () => toggle(id, false),
        });

        return (
          <m.div
            key={`toast_${id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <ToastItemContainer
              className={`bg-${accent}`}
              show={show}
              autohide={autohide}
              onClose={() => toggle(id, false)}
              data-testid="toast"
            >
              {header && (
                <div
                  className={classnames("toast-header", {
                    "text-white": accent !== "secondary",
                  })}
                >
                  <strong className="me-auto">{header}</strong>
                  {closeButton}
                </div>
              )}
              <BSToast.Body
                className={classnames("d-flex fs-5", {
                  "text-white": accent !== "secondary",
                })}
              >
                <div className="flex-grow-1">{body}</div>
                {!header && closeButton}
              </BSToast.Body>
            </ToastItemContainer>
          </m.div>
        );
      },
    );
  }, [toastItemList, toggle]);

  return (
    <ToastWrapper
      aria-live="polite"
      aria-atomic="true"
      data-testid="toast-wrapper"
    >
      <ToastContainer className="d-flex flex-column align-items-end me-4">
        <AnimatePresence>{toastItems}</AnimatePresence>
      </ToastContainer>
    </ToastWrapper>
  );
});

export { Toast };
