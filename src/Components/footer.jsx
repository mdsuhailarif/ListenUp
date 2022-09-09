import React from 'react';
import styled from 'styled-components';
import CurrentTrack from './CurrentTrack';
import PlayerControl from './PlayerControl';
import VolumeControl from './VolumeControl';

export default function Footer() {
  return (
    <Container>
      <div><CurrentTrack/></div>
      <div><PlayerControl/></div>
      <div><VolumeControl/></div>
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

@media(max-width: 860px){
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0.5rem 1rem;
}
`;