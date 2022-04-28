import React from "react";
import styled from "styled-components";

type TagWaitProps = {
    count: number | string;
    type: "all" | "approve" | "finish";
}

type TagStyleProps = {
    type: "all" | "approve" | "finish";
}

const TagStyle = styled.div`
    display: inline-block;
    height: 30px;
    width: auto;
    padding: 4px 5px;
    background: #f1f1f1;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    border-radius: 20px;
`;

const NumberStyle = styled.span<TagStyleProps>`
    display: block;
    float: left;
    height: 22px;
    text-align: center;
    line-height: 22px;
    font-weight: 600;
    border-radius: 20px;
    padding: 0 8px;
    margin-right: 6px;
    ${({ type }) => (type == "all") ?
        `background:#237dc4;
            color:#fff;` :
        (type == "approve") ?
            `background:#ffe033;
            color:#616161;` :
            `background:#257f11;
            color:#fff;`}
`;

const TextStyle = styled.span`
    padding-right: 3px;
    font-weight: 500;
    color: #414141;
    line-height: 22px;
`;



const getType = (type: string) => {
    return type == "all" ? "HT" : (type == "approve") ? "Chờ NT" : "Chờ HT"
}

export default function TagWait({ count, type }: TagWaitProps): JSX.Element {
    return (
        <TagStyle>
            <NumberStyle type={type}>{count}</NumberStyle>
            <TextStyle>{getType(type)}</TextStyle>
        </TagStyle>
    )
}