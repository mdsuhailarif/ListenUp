import React from 'react';
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';

export default function Alertbox() {
    const [{alerts},dispatch] =useStateProvider();
    const alertrdel = () => {
        dispatch({type: reducerCases.SET_ALERT, alerts: null});
    }
    const timeup= setTimeout(alertrdel,10000);
  return (
    <Container>{alerts&&(
        <div className="message">{alerts}</div>
    )}</Container>
  )
}

const Container = styled.div`
display: ${ ({alerts})=>alerts? "block": "none" };
border: 1px solid;
max-width: auto;
width: 5rem;
margin-left: 4rem;
`;