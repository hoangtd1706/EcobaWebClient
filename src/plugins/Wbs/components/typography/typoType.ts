import styled from "styled-components";
import { colorStyleProps, textColor } from "../constain";

export type TypoStyleProps = colorStyleProps & {
  size?: string;
  justifyContent?: "left" | "center" | "right";
  fontWeight?: "bold" | 400 | 600 | 700 | 900;
  letterCase?:
    | "capitalize"
    | "inherit"
    | "lowercase"
    | "uppercase"
    | "math-auto"
    | "none"
    | "revert";
};

export const TypoStyle = styled.p<TypoStyleProps>`
  margin: 8px 0;
  ${({ color }) => (color ? textColor(color) : "color:initial")};
  ${({ justifyContent }) =>
    `justify-content: ${justifyContent ? justifyContent : "initial"}`};

  ${({ fontWeight }) => `font-weight: ${fontWeight ? fontWeight : 400}`};
  ${({ size }) => `font-size: ${size ? size : "14px"}`};
  ${({ letterCase }) =>
    `text-transform: ${letterCase ? letterCase : "initial"}`};
`;
