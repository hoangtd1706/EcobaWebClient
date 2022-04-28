import { Slider } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Typography from '../../../components/typography';
import { ElementStyle, configElement } from '../config';

type NetworkProps = {
    children?: JSX.Element | JSX.Element[];
    code: string,
    text: string,
    requestValue: number,
    approvedValue: number,
    isFinish: boolean,
}

const BlockInfo = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BlockAction = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    align-content: center;
`;

type ButtonType = {
    active: boolean;
}

const ButtonStyle = styled.button<ButtonType>`
    height: 28px;
    width: 90px;
    margin: 3px 0;
    ${({ active }) => (active) ? "cursor: pointer;" : "cursor: not-allowed;"}
`;

export default function NetworkItem({ code, text, isFinish, requestValue, approvedValue }: NetworkProps): JSX.Element {
    const [process, setProcess] = useState<number | number[]>(0);
    const [isActiveApprove, setIsActiveApprove] = useState(false);
    const [isActiveFinish, setIsActiveFinish] = useState(false);
    const [numberChange, setNumberChange] = useState(0);

    const handleChangeProgress = (newValue: number | number[]) => {
        setProcess(newValue)
        if (newValue != (requestValue + approvedValue)) {
            setIsActiveApprove(true);
            return;
        }
    }

    const handleApprove = () => {
        if (process > 0) {
            return true;
        }
        if (process == 0) {
            return false;
        }
    }

    return (
        <ElementStyle status={configElement.getStatusNetwork(isFinish, approvedValue, requestValue)}>
            <BlockInfo>
                <div>
                    <Typography fontWeight="bold" letterCase="uppercase">{text}</Typography>
                    <Typography>{code}</Typography>
                    <Typography>{`${approvedValue}% ${requestValue ? " + " + requestValue + "%" : ""}`}</Typography>
                </div>
                <BlockAction>
                    <ButtonStyle active={isFinish == false && approvedValue <= 100 && requestValue != 0} onClick={handleApprove} >Nghiệm thu</ButtonStyle>
                    <ButtonStyle active={isFinish == false && approvedValue == 100}>Hoàn thành</ButtonStyle>
                </BlockAction>
            </BlockInfo>
            <Slider
                aria-label="Temperature"
                defaultValue={approvedValue + requestValue}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={0}
                max={100}
                onChange={(event, newValue) => handleChangeProgress(newValue)}
            />
        </ElementStyle>
    )
}