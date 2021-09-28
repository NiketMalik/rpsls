import type { MATERIAL_TYPES } from "constants/material";

export interface MaterialProps {
  type?: MATERIAL_TYPES;
  radius?: number;
  isDisabled?: boolean;
  isHighlited?: boolean;
  onClick?: () => void;
}
