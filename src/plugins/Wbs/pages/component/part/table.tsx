import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import IconButton from '@material-ui/core/IconButton';
import { IComponent, IPart } from "../../../services/component/constant";

function createData(
    partCode: string,
    partName: string,
    quantity: number,
) {
    return {
        partCode,
        partName,
        quantity
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.partCode}
                </TableCell>
            </TableRow>

        </React.Fragment>
    )
}

type PartType = {
    data: IComponent
}

export default function TablePart({ data }: PartType): JSX.Element {
    const [open, setOpen] = useState(false);
    const rows = (data: IComponent) => {
        data.parts.map(item => createData(item.partCode, item.partName, item.quantity))
    }
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Part Code</TableCell>
                        <TableCell>Part Name</TableCell>
                        <TableCell>Quantity</TableCell>
                    </TableRow>
                </TableHead>
                {/* <TableBody>
                    {data.parts.map((part) => (
                        <TableRow key={part.partCode}>
                            <TableCell>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {part.partCode}
                            </TableCell>
                            <TableCell align="right">{part.partName}</TableCell>
                            <TableCell align="right">{part.quantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody> */}
            </Table>
        </TableContainer>
    )
}