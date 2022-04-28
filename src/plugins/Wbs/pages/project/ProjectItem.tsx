import React from 'react'
import styled from 'styled-components';
import history from '../../../../configs/history';
import Card from '../../components/card';
import TagStatus from '../../components/tag/status';
import IconProject from "../../images/icon-project.png";
import { textStyleProps } from '../../components/constain';

const TextStyle = styled.div<textStyleProps>`
    ${({ textAlign }) => (textAlign != null) && `text-align: ${textAlign};`}
    ${({ fontWeight }) => (fontWeight != null) && `font-weight: ${fontWeight};`}
    cursor: pointer;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    &:hover{
        color: #313131;
    }
`;


type ProjectItem = {
    text: string,
    code: string,
}

const BlockContent = styled.div`
    display: flex;
    margin-top: 10px;
    align-items: center;
`;

const BlockImage = styled.div`
    display: block;
    max-width: 32px;
    width: 100%;
    height: 32px;
    margin-right: 10px;
`;

const Image = styled.img`
    display: block;
    width: 100%;
    height: 100%;
`;
export default function ProjectItem({ code, text }: ProjectItem): JSX.Element {
    const handleClick = (projectCode: string) => {
        sessionStorage.setItem("projectCode", projectCode);
        history.push(sessionStorage.getItem("lastRoute") as string);
    }
    return (
        <Card>
            <TagStatus bgColor="secondary" color="secondary" text="Đang thi công" />
            <BlockContent>
                <BlockImage>
                    <Image src={IconProject} alt="" />
                </BlockImage>
                <TextStyle onClick={() => handleClick(code)} fontWeight="bold"><span>{text}</span></TextStyle>
            </BlockContent>
        </Card>
    )
}