import React from "react"
import styled from "styled-components";
import TagWait from "../../../components/tag/wait";
import Typography from "../../../components/typography";
import { ElementStyle, configElement } from '../config';

type ChildrenProps = {
    children?: JSX.Element | JSX.Element[],
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    code: string,
    text: string,
    waitToApprove: number,
    waitToFinish: number,
    totalNetworks: number,
    finishedNetworks: number,
}

const BlockStyle = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

const Typo = styled(Typography)`
    display: inline;
`

export default function ChildrenItem({ code, text, waitToApprove, waitToFinish, totalNetworks, finishedNetworks, onClick }: ChildrenProps): JSX.Element {
    return (
        <ElementStyle status={configElement.getStatusElement(false, waitToApprove, waitToFinish)} onClick={onClick}>
            <BlockStyle>
                <Typo fontWeight="bold" letterCase="uppercase">{text}</Typo>
                <TagWait count={totalNetworks} type="all" />
            </BlockStyle>
            <Typography>{code}</Typography>

            <div>
                <TagWait count={waitToApprove} type="approve" />
                <TagWait count={waitToFinish} type="finish" />
            </div>
        </ElementStyle>
    )
}