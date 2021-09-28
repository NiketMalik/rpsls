import styled from "@emotion/styled";

export const ToolbarContainer = styled.div`
  position: relative;
  height: 42px;

  @media (min-width: 1200px) {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 42px;
  }
`;
