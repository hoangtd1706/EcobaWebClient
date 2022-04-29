import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import history from "../../../configs/history";
import Plan from "../pages";
import ListProject from "../pages/project/ListProject";
import Element from "../pages/element";
import Components from "../pages/component";
import ComponentItem from "../pages/component/item";

export default function PublicRoutes(): JSX.Element {
    const { path } = useRouteMatch();
    const location = useLocation();

    if (location.pathname == "/project-system/elements") {
        const projectCode = sessionStorage.getItem('projectCode');
        if (projectCode == null) {
            history.push(`${path}/projects`)
            sessionStorage.setItem("lastRoute", `${path}/elements`)
        } else {
            history.push(`${path}/projects/${projectCode}/elements`)
        }
    } if (location.pathname == "/project-system/components") {
        const projectCode = sessionStorage.getItem('projectCode');
        if (projectCode == null) {
            history.push(`${path}/projects`)
            sessionStorage.setItem("lastRoute", `${path}/components`)
        } else {
            history.push(`${path}/projects/${projectCode}/components`)
        }
    }
    return (
        <Switch>
            <Switch>
                <Route exact path={`${path}/projects/:projectCode/components/:componentCode`} component={ComponentItem} />
                <Route exact path={`${path}/projects/:projectCode/components`} component={Components} />
                <Route exact path={`${path}/projects/:projectCode/elements/:elementCode`} component={Element} />
                <Route exact path={`${path}/projects/:projectCode/elements`} component={Element} />
                <Route exact path={`${path}/projects/:projectCode`} component={Element} />
                <Route exact path={`${path}/projects`} component={ListProject} />
                <Route exact path={`${path}`} component={Plan} />
            </Switch>
        </Switch>
    )
}