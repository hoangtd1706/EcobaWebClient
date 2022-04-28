import React from "react";
import styled from "styled-components";

type ColStyleProps = {
    mobile?: number;
    tablet?: number;
    desktop?: number
}

const ColStyle = styled.div<ColStyleProps>`
    display: grid;
    justify-content: space-between; 
    align-items: stretch;
    column-gap: 10px;
    row-gap: 10px;

${({ mobile }) =>
        mobile
            ? `grid-template-columns: repeat(${mobile},1fr);`
            : "display: none"};
@media ${"only screen and (min-width: 768px)"} {
  ${({ tablet }) =>
        tablet
            ? `grid-template-columns: repeat(${tablet},1fr); `
            : "display:none"};
  ${({ desktop, tablet }) => !desktop && tablet && "display: inline-grid"}
}

@media ${"only screen and (min-width: 1024px)"} {
  ${({ desktop }) =>
        desktop
            ? `grid-template-columns: repeat(${desktop},1fr); `
            : "display:none"
    };
  ${({ desktop, tablet }) => desktop && !tablet && "display: inline-grid"}
}
`;

type ColProps = ColStyleProps & {
    children?: JSX.Element | JSX.Element[] | string;
}

export default function Col({ children, desktop, tablet, mobile }: ColProps): JSX.Element {
    return (
        <ColStyle desktop={desktop} tablet={tablet} mobile={mobile} >
            {children}
        </ColStyle>
    )
}