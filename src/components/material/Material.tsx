import { useCallback, memo } from "react";

import type { MaterialProps } from "./types";

import { DEFAULT_RADIUS } from "./constants";
import { MATERIAL_TYPES } from "constants/material";

import { MaterialContainer, MaterialImage, MaterialHighlight } from "./styles";

import rockIcon from "static/images/material-rock.svg";
import paperIcon from "static/images/material-paper.svg";
import scissorIcon from "static/images/material-scissor.svg";
import lizardIcon from "static/images/material-lizard.svg";
import spockIcon from "static/images/material-spock.svg";

const MATERIAL_ICONS_MAP = {
  [MATERIAL_TYPES.ROCK]: rockIcon,
  [MATERIAL_TYPES.PAPER]: paperIcon,
  [MATERIAL_TYPES.SCISSOR]: scissorIcon,
  [MATERIAL_TYPES.LIZARD]: lizardIcon,
  [MATERIAL_TYPES.SPOCK]: spockIcon,
};

export const Material = memo(
  ({ type, radius, isDisabled, isHighlited, onClick }: MaterialProps) => {
    const materialIconUrl = type && MATERIAL_ICONS_MAP[type];

    const handleClick = useCallback(() => {
      if (isDisabled) {
        return;
      }

      onClick?.();
    }, [isDisabled, onClick]);

    return (
      <MaterialContainer
        aria-label={type}
        material={type}
        radius={radius || DEFAULT_RADIUS}
        onClick={handleClick}
        disabled={isDisabled || !materialIconUrl}
        data-is-highlited={!!isHighlited}
      >
        {materialIconUrl && <MaterialImage src={materialIconUrl} alt={type} />}
        <MaterialHighlight />
      </MaterialContainer>
    );
  },
);
