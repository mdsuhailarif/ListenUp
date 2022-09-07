import React from 'react';
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';
import { IoCloseSharp } from 'react-icons/io5';

export default function Alertbox() {
    const [{ alerts }, dispatch] = useStateProvider();
    const alertDel = () => {
        dispatch({ type: reducerCases.SET_ALERT, alerts: false });
    }

    if(alerts){
        setTimeout(alertDel,10000);
    }

    return (
        alerts && (<Container chng={alerts}>
            <span>{alerts} </span>
            <span onClick={alertDel}><IoCloseSharp /> </span>
        </Container>)
    )
}

const Container = styled.div`
z-index:1;
display: flex;
justify-content: center;
background-color: #ae6070;
border-radius: 0.5rem;
padding: 0.1rem 0.5rem;
position: fixed;
top: 2px;
right: 1rem;
transition: 0.1s ease-in-out;
svg{
    font-size: 1.5rem;
    cursor: pointer;
}
`;