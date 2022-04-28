import React from "react";
import styled from "styled-components";
import { backgroundColor, colorStyleProps, textColor } from "../constain";

const StatusStyle = styled.span<colorStyleProps>`
    display: inline-block;
    padding: 4px 10px;
    border-radius: 3px;
    ${({ bgColor }) => (bgColor) ? backgroundColor(bgColor) : "color:initial"}
    ${({ color }) => (color) ? textColor(color) : "color:initial"};
`;

type StatusProps = colorStyleProps & {
    children?: string,
    text: string,
}

export default function TagStatus({ children, color, bgColor, text }: StatusProps): JSX.Element {
    return (
        <StatusStyle color={color} bgColor={bgColor}>
            {children && children}
            {text}
        </StatusStyle>
    )
}