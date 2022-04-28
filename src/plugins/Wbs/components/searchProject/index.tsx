import React from 'react'
import styled from 'styled-components'
import history from '../../../../configs/history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchStyle = styled.div`
    display: flex;
    height: 36px;
    max-width: 500px;
    width:100%;
    margin: 20px auto 10px auto;
    background: #fff;
    border-radius: 20px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 768px) {
        margin: 20px 10px 10px 10px;
        width: auto;
    }
`;

const InputStyle = styled.input`
    width: calc(100% - 60px);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border: none;
    outline: none;
    padding: 0 20px;
`;

const ButtonStyle = styled.button`
    display: flex;
    color: green;
    width: 30px;
    height: 30px;
    margin-right: 4px;
    padding: 10px;
    background: #f1f1f1;
    border: none;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    outline: none;
    cursor: pointer;
`;

export default function SearchProject(): JSX.Element {
    const handleClick = () => {
        sessionStorage.removeItem("projectId");
        history.replace("/project-system/projects");
    }
    return (
        <SearchStyle>
            <InputStyle type="text" value="VOV Mễ Trì" />
            <ButtonStyle onClick={handleClick}><FontAwesomeIcon icon="angle-double-left" /></ButtonStyle>
        </SearchStyle>
    )
}