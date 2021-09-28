import styled from "@emotion/styled";

import { Container } from "react-bootstrap";

import boardImage from "static/images/board.png";

export const BoardContainer = styled(Container)`
  position: relative;
  max-width: 1220px;

  @media (min-width: 1200px) {
    height: 70vh;
    width: auto;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    background-image: url("${boardImage}");
    background-repeat: no-repeat;
    background-size: 100% 90%;
    background-position: center;

    @media (min-width: 1200px) {
      background-size: contain;
    }
  }
`;
