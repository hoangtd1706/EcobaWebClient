import React, { useEffect, useState } from "react";
import { Route, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import history from "../../../../configs/history";
import Element from "../../pages/element";

type ActivityStyleProps = {
    active: boolean,
}

const ActivityStyle = styled.div<ActivityStyleProps>`
`;

const CheckStyle = styled.div`
    max-width: 100px;
    width:100%;
    @media (max-width: 768px) {
        order: 1000;
    }
`;

const Content = styled.div`
`;

const NameStyle = styled.span`
    @media (max-width: 768px) {
        display: block;
        width:100%;
        font-weight: bold;
        margin-bottom: 8px;
    }
`;

const CodeStyle = styled.span`
    @media (max-width: 768px) {
    }
`;

type ActivityItemProps = {
    isLeaf: boolean,
    text: string,
    code: string,
    level: number,
    start: string,
    finish: string,
    startProject: string,
    finishProject: string,
    projectId: string,
}

export default function ActivityItem({ isLeaf, projectId, code, text, level, startProject, start, finish, finishProject }: ActivityItemProps): JSX.Element {
    const [isActive, setIsActive] = useState(false);
    const { path } = useRouteMatch();
    const handleClick = (code: string) => {
        if (!isLeaf) history.replace(`/project-system/projects/${projectId}/elements/${code}`);
        return;
    }

    const handleOnCheck = () => {
        setIsActive(!isActive);
    }
    return (
        <ActivityStyle active={isActive}>
            <CheckStyle>
                <input type="checkbox" onChange={handleOnCheck} checked={isActive} value={code} name="activity" />
            </CheckStyle>
            <Content onClick={() => handleClick(code)}>
                <CodeStyle>{code}</CodeStyle>
                <NameStyle>{text}</NameStyle>
            </Content>
            {isLeaf && (<Route exact path={`${path}/${code}`} component={Element} />)}
        </ActivityStyle>
    )
}