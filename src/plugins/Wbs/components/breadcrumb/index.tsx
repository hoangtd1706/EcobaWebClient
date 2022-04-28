import React from "react";
import styled from "styled-components";
import { colorStyleProps } from "../constain";

const Container = styled.div`
    display: block;
    margin: 10px 0;
`;

type BreadcrumbProps = colorStyleProps & {
    data: JSX.Element[];
}

const BreadcrumbStyle = styled.ul<colorStyleProps>`
    display: flex;
`;




export default function Breadcrumb({ data, color, bgColor }: BreadcrumbProps): JSX.Element {

    return (
        <Container>
            <BreadcrumbStyle color={color} bgColor={bgColor} >{data?.map(item => {
                return (
                    item
                )
            })}</BreadcrumbStyle>
        </Container>
    )
}