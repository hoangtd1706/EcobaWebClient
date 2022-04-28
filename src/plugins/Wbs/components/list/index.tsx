import React from "react";
import styled from "styled-components";

const ListStyle = styled.div`
    display: flex;
    flex-flow:row wrap;
    background: #fff;
    border-radius: 3;
    padding: 10px;
    @media (max-width: 768px) {
        background: none;
        border-radius: none;
        padding: 0; 
    }
`;

type ListProps = {
    children?: JSX.Element[] | JSX.Element;
}

export default function List({ children }: ListProps): JSX.Element {
    return (
        <ListStyle>
            {children}
        </ListStyle>
    )
}