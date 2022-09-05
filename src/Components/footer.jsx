import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <div>footer</div>
      <div>footer</div>
      <div>footer</div>
    </Container>
  )
}

const Container = styled.div`
background-color: #181818;
height: 100%;
width: 100%;
border-top: 1px solid #282828;
display: grid;
grid-template-columns: 1fr 2fr 1fr;
align-items: center;
justify-content: center;
padding: 0 1rem;
`;