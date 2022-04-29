import React, { useEffect, useState } from 'react';
import { componentService } from '../../services/component/component.service';
import { useParams, useRouteMatch } from 'react-router-dom';
import { IComponents } from '../../services/component/constant';
import Col from '../../components/grid/column';
import Card from '../../components/card';
import history from '../../../../configs/history';

type params = {
    projectCode: string,
}

export default function Components(): JSX.Element {
    const { projectCode } = useParams<params>();
    const [components, setComponents] = useState<IComponents[] | null>(null);

    useEffect(() => {
        const getListComponent = async () => {
            const data = await componentService.getAllComponents(projectCode);
            setComponents(data);
        }
        getListComponent();
    }, [projectCode])

    const handleClick = (componentCode: string) => {
        history.replace(`/project-system/projects/${projectCode}/components/${componentCode}`);
    }

    return (
        <Col desktop={4} tablet={3} mobile={1}>
            <>
                {components && components.map(item => (
                    <Card key={item.componentCode}>
                        <div onClick={() => handleClick(item.componentCode)}>
                            <p>{item.componentCode}</p>
                            <p>{item.componentName}</p>
                            <p>{item.totalQuantity}</p>
                        </div>
                    </Card>
                ))}
            </>
        </Col>
    );
}
