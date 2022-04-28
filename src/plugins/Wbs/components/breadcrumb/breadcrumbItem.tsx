import React from 'react'
import styled from 'styled-components';
import { colorStyleProps } from '../constain'

type BreadcrumbItemProps = colorStyleProps & {
    children: string | JSX.Element | JSX.Element[];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BreadcrumbItemStyle = styled.li`
    list-style-type: none;
`;

export default function BreadcrumbItem({ children }: BreadcrumbItemProps): JSX.Element {
    return (
        <BreadcrumbItemStyle>
            {children}
        </BreadcrumbItemStyle>
    )
}