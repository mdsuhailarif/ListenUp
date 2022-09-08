import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';


export default function Recommendations() {

    const [{ token, recomm }, dispatch] = useStateProvider();

    useEffect(() => {
        const getUserInfo = async () => {
            const response = await axios.get(
                'https://api.spotify.com/v1/recommendations?seed_artists=3mOWS2HCVfTNCiPiRuDqdf%2C008PpLcKUtVXle6JSwkq3I&seed_genres=hiphop&seed_tracks=0KTj6k94XZh0c6IEMfxeWV',
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );
            const item = response.data.tracks.map((track) => ({
                track: track
            })
            );
            const recomm = item.map(
                ({ track}) =>
                ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[1].url,
                    preview_url: track.preview_url?track.preview_url:null
                })
            );
            dispatch({ type: reducerCases.SET_RECCOM, recomm });
            
        };
        getUserInfo();
    
    }, [token, dispatch])

    const updateCurrentTrack = async (id, name, artists, image, preview_url) => {
        const currentPlaying = {
            id: id,
            name: name,
            artists: artists,
            image: image,
            preview_url: preview_url?preview_url:null
        };
        dispatch({ type: reducerCases.SET_PLAYLING, currentPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
    };
    
    return (
        <Container>
            <span>Recommendations</span>
            <ul>
                {
                    recomm&&(recomm.map(({ name, image,artists,id, preview_url },index) =>
                    <li key={index} onClick={() => updateCurrentTrack(id, name, artists, image, preview_url)}>
                        <img src={image} alt="playlist" />
                        <span className='name'>{name}</span>
                        <span className='artists'>{artists.join(", ")}</span>
                    </li>))
                }
            </ul>
        </Container>
    )
}

const Container = styled.div`
padding-top:1rem;
display: flex;
flex-direction:column;
span{
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 0 2rem;
}
ul{
    display:flex;
    gap:2rem;
    overflow: auto;
    &::-webkit-scrollbar{
        display:none;}
    li{
        cursor: pointer;
        display:flex;
        flex-direction: column;
        color: white;
        height: 27vh;
        width: 20vh;
        background-color: rgb(0,0,0, 0.4);
        border-radius: 0.5rem;
        img{
            height: 15vh;
            width: 15vh;
            object-fit: cover;
            border-radius: 1.5rem;
            padding: 1rem 1rem;
        }
        .name{
            width:12vh;
            font-size: 1rem;
            white-space: nowrap;
            overflow: hidden;
            padding: 0 1rem;
            padding-bottom: 0.5rem;
        }
        .artists{
            width:12vh;
            font-size: 0.7rem;
            white-space: nowrap;
            overflow: hidden;
            color: #b3b3b3;
            font-weight: 400;
            padding: 0 1rem;
            padding-bottom: 0.5rem;
        }
    }
}
`;

