import axios from 'axios';
import React from 'react'
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';

export default function VolumeControl() {

    const [{token},dispatch] =useStateProvider();

    const setVolume = async (e) => {
        await axios.put(
            'https://api.spotify.com/v1/me/player/volume',{},
            {
                params: {
                    volume_percent: parseInt(e.target.value)
                },
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                }
            }
        )
        .catch(function (error) {
            if (error.response) {
              const alerts= error.response.data.error.message;
              dispatch({type: reducerCases.SET_ALERT, alerts });
            } 
          });
          
    };

  return (
    <Container>
        <input type="range" min={0} max={100} onMouseUp={ (e) => setVolume(e) } />
    </Container>
  )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
input{
    width:16vw;
    border-radius: 2rem;
    height: 0.4rem;
}
@media (max-width: 860px){
    display: none;
}
`;