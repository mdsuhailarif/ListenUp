import React from 'react';
import { useRef } from 'react';
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsShuffle } from 'react-icons/bs';
import { CgPlayTrackNext, CgPlayTrackPrev } from 'react-icons/cg';
import { FiRepeat } from 'react-icons/fi';
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';


export default function PlayerControl() {

    const [{ playerState, currentPlaying, selectedPlaylist }, dispatch] = useStateProvider();
    const ref = useRef();
    const changeTrack = async (type) => {

        let ind = currentPlaying.index;
        type === "next" ? ind++ : ind--;
        
        const item = selectedPlaylist.tracks[ind];
        const currentplay = {
            index: ind,
            id: item.id,
            name: item.name,
            artists: item.artists,
            image: item.image,
            preview_url: item.preview_url ? item.preview_url : null
        };
        dispatch({ type: reducerCases.SET_PLAYLING, currentPlaying: currentplay });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
    };

    const changeState = () => {
        if (ref.current?.src) 
        {
            if (playerState) {
                ref.current.pause();
            }
            else {
                ref.current.play();
            }
            dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: !playerState });
            dispatch({type: reducerCases.SET_ALERT, alerts: false });
        }
        else
        dispatch({type: reducerCases.SET_ALERT, alerts: "Preview Not Available" });
    }

    return (
        <Container>
            {currentPlaying && (<audio
                ref={ref}
                src={currentPlaying.preview_url}
            />)}
            <div className="shuffle">
                <BsShuffle />
            </div>
            <div className="prev">
                <CgPlayTrackPrev onClick={() => changeTrack("previous")} />
            </div>
            <div className="state">
                {playerState ? <BsFillPauseCircleFill onClick={changeState} /> : <BsFillPlayCircleFill onClick={changeState} />}
            </div>
            <div className="next">
                <CgPlayTrackNext onClick={() => changeTrack("next")} />
            </div>
            <div className="repeat">
                <FiRepeat />
            </div>
        </Container>
    )
}

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
gap:2rem;
svg{
    color: #b3b3b3;
    trasition: 0.2s ease-in-out;
    &:hover{
        color: white;
    }
}
.state{
    svg{
        color: white;
    }
}
.prev, .next, .state{
    font-size:2rem;
}

`;