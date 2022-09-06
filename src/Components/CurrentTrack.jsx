import axios from 'axios';
import React, { useEffect } from 'react'
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';


export default function CurrentTrack() {

    const [{ token, currentPlaying }, dispatch] = useStateProvider();
    useEffect(() => {
        const getcurrentTrack = async () => {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/player/currently-playing',
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );
            if (response.data !== "") {
                const { item } = response.data;
                const currentPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,
                    preview_url: item.preview_url
                };
                dispatch({ type: reducerCases.SET_PLAYLING, currentPlaying });
            }
        };
        getcurrentTrack();
    }, [token, dispatch])


    return (
        <Container>
            {
                currentPlaying && (
                    <div className="track">
                        <div className="track_image">
                            <img src={currentPlaying.image} alt="currentplaying" />
                        </div>
                        <div className="track_info">
                            <span className='name'>{currentPlaying.name}</span>
                            <span className='artist'>{currentPlaying.artists.join(", ")}</span>
                        </div>
                    </div>
                )
            }
        </Container>
    )
}


const Container = styled.div`
.track{
    display: flex;
    align-items: center;
    gap:1rem;
    .track_info{
            display:flex;
            flex-direction: column;
            gap:0.5rem;
            
            .name{
                color: #dddcdc;
            }
            .artist{
                color:#b3b3b3;
                font-size: 0.8rem;
            }
        }
}
`;