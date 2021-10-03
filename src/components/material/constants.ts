import { MATERIAL_TYPES } from "constants/material";

import rockIcon from "static/images/material-rock.svg";
import paperIcon from "static/images/material-paper.svg";
import scissorIcon from "static/images/material-scissor.svg";
import lizardIcon from "static/images/material-lizard.svg";
import spockIcon from "static/images/material-spock.svg";

export const MATERIAL_ICONS_MAP = {
  [MATERIAL_TYPES.ROCK]: rockIcon,
  [MATERIAL_TYPES.PAPER]: paperIcon,
  [MATERIAL_TYPES.SCISSOR]: scissorIcon,
  [MATERIAL_TYPES.LIZARD]: lizardIcon,
  [MATERIAL_TYPES.SPOCK]: spockIcon,
};

export const DEFAULT_RADIUS = 60;
