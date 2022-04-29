import React, { useEffect } from 'react'
import { IComponent, IPart } from '../../../services/component/constant'
import CollapsibleTable from '../table'
import TablePart from './table'


type PartType = {
    data: IComponent
}

export default function Part({ data }: PartType): JSX.Element {

    return (
        <>
            <TablePart data={data} />
        </>
    )
}