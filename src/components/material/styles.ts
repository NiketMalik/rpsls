import styled from "@emotion/styled/macro";

import { MATERIAL_TYPES } from "constants/material";

import { getLinearGradient } from "utils/styles";

interface MaterialContainerProps {
  material?: MATERIAL_TYPES;
  radius: number;
}

export const MaterialHighlight = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background: ${(props) => props.theme.gradients.background.start};
    transition: transform 0.25s ease-in-out;
    pointer-events: none;
  }

  &::before {
    width: 220%;
    height: 220%;
    top: -60%;
    left: -60%;

    opacity: 0.1;
  }

  &::after {
    width: 160%;
    height: 160%;
    top: -30%;
    left: -30%;

    opacity: 0.15;
  }
`;

export const MaterialContainer = styled.button<MaterialContainerProps>`
  position: relative;
  width: ${(props) => props.radius * 2}px;
  height: ${(props) => props.radius * 2}px;
  min-width: ${(props) => props.radius * 2}px;
  min-height: ${(props) => props.radius * 2}px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    z-index: 1;
  }

  &::before {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    ${(props) =>
      getLinearGradient(
        props.theme.gradients.material[props.material || "DEFAULT"],
      )}
    opacity: ${(props) => (props.material ? "1" : "0.5")};
    box-shadow: ${(props) =>
      props.material ? "inset 0 -5px rgba(0, 0, 0, 0.15)" : "none"};
  }

  &::after {
    display: ${(props) => (props.material ? "block" : "none")};
    top: 50%;
    left: 50%;
    width: 80%;
    height: 80%;
    transform: translate(-50%, -50%);

    background: white;
    box-shadow: inset 0 7px rgba(0, 0, 0, 0.15);
  }

  &:not([disabled]):active {
    transform: scale(0.95);
  }

  &[data-is-highlited="true"] {
    margin: 30%;

    ${MaterialHighlight} {
      &::before,
      &::after {
        transform: scale(1);
      }
    }
  }

  &[data-is-highlited="false"] {
    ${MaterialHighlight} {
      &::before,
      &::after {
        transform: scale(0);
      }
    }
  }
`;

export const MaterialImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 45%;
  height: 45%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
