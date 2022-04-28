import React, { useEffect, useState } from "react"
import { Breadcrumbs } from "@material-ui/core";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/card";
import SearchProject from "../../components/searchProject";
import TagStatus from "../../components/tag/status";
import Typography from "../../components/typography";
import { data } from "./mockup";
import Col from "../../components/grid/column";
import history from "../../../../configs/history";
import TagWait from "../../components/tag/wait";
import ChildrenItem from "./children";
import NetworkItem from "./network";
import { ElementModel, elementService } from "../../services/elements.service";

const Container = styled.div`
    display: block;
    width: 100%;
`;

const WbsStyle = styled.div`
     @media (max-width: 600px) {
        padding: 10px;
    }
`;

type modelBreadcrumb = {
    elementName: string,
    elementCode: string,
    level: number,
}

type params = {
    projectCode: string,
    elementCode: string,
}

const BreadcrumbStyle = styled(Breadcrumbs)`
    padding: 20px 0 10px 0;
`;

const BreadcrumbItem = styled.span`
    background: transparent;
    border-radius: 3px;
    border: .5px solid transparent;
    font-size: 14px;
    padding: 3px 6px;
    cursor: pointer;
    &:hover{
        border: .5px solid #c5c5c5;
        background: #fafafa;
    }
`;

const ListStyle = styled(Col)`
    margin-top: 20px;
`;

export default function Element(): JSX.Element {
    const { projectCode, elementCode } = useParams<params>();
    const [project, setProject] = useState<ElementModel | null>(null);

    if (projectCode != null) {
        sessionStorage.removeItem("projectCode");
        sessionStorage.setItem("projectCode", projectCode);
    }
    const handleClickBreadcrumb = (data: modelBreadcrumb) => {
        if (data.elementCode === projectCode) {
            history.replace(`/project-system/projects/${projectCode}/elements`);
        }
        history.replace(`/project-system/projects/${projectCode}/elements/${data.elementCode}`);
    }
    const renderBreadcrumb = (data: modelBreadcrumb[]): any => {
        if (data != null)
            return data.map((breadcrumb) => {
                return (
                    <BreadcrumbItem key={breadcrumb.elementCode} onClick={() => handleClickBreadcrumb(breadcrumb)}>{breadcrumb.elementName}</BreadcrumbItem>
                )
            })
    }

    const handleClickElement = (projectCode: string, elementCode: string) => {
        console.log("jsdhf")
        history.replace(`/project-system/projects/${projectCode}/elements/${elementCode}`);
    }

    useEffect(() => {
        const getProject = async () => {
            const _project = await elementService.getProjectDetail(projectCode, (elementCode ?? projectCode));
            setProject(_project);
        }
        getProject();
    }, [projectCode, elementCode])


    return (
        <WbsStyle>
            <SearchProject />
            {project ? (
                <>
                    <Card >
                        <TagStatus text="Đang thi công" color="secondary" bgColor="secondary" />
                        <Container>
                            <Typography fontWeight="bold" size="16px" letterCase="uppercase">{`[${project.elementCode}] ${project.elementName}`}</Typography>
                        </Container>
                        <div>
                            <TagWait count={`${project.finishedNetworks}/${project.totalNetworks}`} type="all" />
                            <TagWait count={project.waitToApprove} type="approve" />
                            <TagWait count={project.waitToFinish} type="finish" />
                        </div>
                    </Card>
                    <BreadcrumbStyle separator="/">
                        {renderBreadcrumb(project.breadcrumbs)}
                        <BreadcrumbItem key={project.elementCode} >{project.elementName}</BreadcrumbItem>
                    </BreadcrumbStyle>
                    <ListStyle desktop={4} tablet={3} mobile={1}>
                        <>
                            {project.children && project.children.map((item) => (
                                <ChildrenItem
                                    key={item.elementCode}
                                    code={item.elementCode}
                                    text={item.elementName}
                                    waitToApprove={item.waitToApprove}
                                    waitToFinish={item.waitToFinish}
                                    totalNetworks={item.totalNetworks}
                                    finishedNetworks={item.finishedNetworks}
                                    onClick={() => handleClickElement(projectCode, item.elementCode)} />
                            ))}

                            {project.networks && project.networks.map((item) => (
                                <NetworkItem
                                    key={item.networkCode}
                                    code={item.networkCode}
                                    text={item.networkName}
                                    isFinish={item.isFinish}
                                    approvedValue={item.approvedValue}
                                    requestValue={item.requestValue} />
                            ))}
                        </>
                    </ListStyle>
                </>
            ) : <></>}




        </WbsStyle>
    )
}