import { memo } from "react";

import type { MaterialProps } from "./types";

import { DEFAULT_RADIUS, MATERIAL_ICONS_MAP } from "./constants";

import { MaterialContainer, MaterialImage, MaterialHighlight } from "./styles";

export const Material = memo(
  ({ type, radius, isDisabled, isHighlited, onClick }: MaterialProps) => {
    const materialIconUrl = type && MATERIAL_ICONS_MAP[type];

    return (
      <MaterialContainer
        aria-label={type}
        material={type}
        radius={radius || DEFAULT_RADIUS}
        onClick={!isDisabled ? onClick : undefined}
        data-disabled={isDisabled || !materialIconUrl}
        data-is-highlited={!!isHighlited}
        data-testid="material"
      >
        {materialIconUrl && (
          <MaterialImage
            src={materialIconUrl}
            alt={type}
            data-testid="material-image"
          />
        )}
        <MaterialHighlight data-testid="material-highlight" />
      </MaterialContainer>
    );
  },
);
