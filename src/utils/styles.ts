import { css } from "@emotion/react";

export interface GradientProps {
  start: string;
  end: string;
}

export const getLinearGradient = ({ start, end }: GradientProps) =>
  css({
    backgroundImage: `linear-gradient(to bottom right, ${start}, ${end})`,
  });
