import styled from "@emotion/styled";
import { Toast as BSToast } from "react-bootstrap";

export const ToastWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 10px;
  z-index: 99999;
`;

export const ToastContainer = styled.div`
  position: relative;
  bottom: 0;
  right: 0;

  a {
    color: inherit !important;
    text-decoration: underline;
  }
`;

export const ToastItem = styled(BSToast)`
  z-index: 9999999;
`;
