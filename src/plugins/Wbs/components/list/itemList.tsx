import React from "react";
import styled from "styled-components";

const ItemStyle = styled.div`
    width: 100%;
    display: flex;
    border-bottom: .5px solid #f1f1f1;
    padding: 6px 0;
    margin: 10px 0;
    cursor: pointer;
`;

type ItemProps = {
    children?: JSX.Element | JSX.Element[] | string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function ItemList({ children, onClick }: ItemProps): JSX.Element {
    return (
        <ItemStyle onClick={onClick}>
            {children}
        </ItemStyle>
    )
}