import React from "react";
import styled from "styled-components";

const CardStyle = styled.div`
    display: block;
    background: #fff;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    padding: 10px;
    &:hover{
        background: #f8f8f8;
        box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
    }
`;

type CardProps = {
    children: JSX.Element | JSX.Element[] | string;
}

export default function Card({ children }: CardProps): JSX.Element {
    return (
        <CardStyle>{children}</CardStyle>
    )
}