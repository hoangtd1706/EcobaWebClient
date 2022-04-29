import { AppBar, makeStyles, Tab, Tabs, Theme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import TabPanel, { a11yProps } from "../../components/tabs/TabPanel";
import { paramsType } from "../../constant";
import { componentService } from "../../services/component/component.service";
import { IComponent } from "../../services/component/constant";
import Mapping from "./mapping";
import TablePart from "./part/table";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));



export default function ComponentItem(): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = useState('one');
    const { projectCode, componentCode } = useParams<paramsType>();
    const [component, setComponent] = useState<IComponent | null>(null);

    useEffect(() => {
        const getComponent = async () => {
            const data = await componentService.getComponent(projectCode, componentCode);
            setComponent(data);
        }
        getComponent();
    }, [component])

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };
    return (
        <>
            <AppBar position="static">
                <Tabs value={value} onChange={(event, newValue) => handleChange(newValue)} aria-label="wrapped label tabs example">
                    <Tab
                        value="one"
                        label="Part"
                        {...a11yProps('two')}
                    />
                    <Tab
                        value="two"
                        label="Mapping"
                        {...a11yProps('two')}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index="one">
                {component &&
                    <TablePart data={component} />
                }
            </TabPanel>
            <TabPanel value={value} index="two">
                <Mapping />
            </TabPanel>
        </>
    );
}