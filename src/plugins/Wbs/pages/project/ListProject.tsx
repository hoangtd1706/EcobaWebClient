import React from "react";
import styled from "styled-components";
import Col from "../../components/grid/column";
import SearchProject from "../../components/searchProject";
import ProjectItem from "./ProjectItem";
import { projects } from "../element/mockup";


export default function ListProject(): JSX.Element {

    return (
        <>
            <SearchProject />
            <Col desktop={4} tablet={3} mobile={1}>
                {
                    projects.map((item, key) => (
                        <ProjectItem code={item.elementCode} text={item.elementName} key={key} />
                    ))
                }
            </Col>
        </>

    )
}