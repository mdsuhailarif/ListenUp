import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';
import RecentlyPlayed from './RecentlyPlayed';
import Recommendations from './Recommendations';

export default function Home({playlist}) {

    const [{ playlists }, dispatch] = useStateProvider();

    const selectPlaylist = async (selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLISTID, selectedPlaylistId });
    };

    return (
        <Container >

            <span>Your Playlists</span>
            <ul>
                {playlists.map(({ name, images, id }) =>
                <Link key={id} to="/body" style={{ textDecoration: 'none' }}>
                <li  onClick={() => selectPlaylist(id)}>
                        <img src={images[0].url} alt="playlist" />
                        <span>{name}</span>
                    </li>
                    </Link>)
                }
            </ul>
            <RecentlyPlayed />
            <Recommendations />
        </Container>
    )
}

const Container = styled.div`
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
    li{
        display:flex;
        flex-direction: column;
        color: white;
        background-color: rgb(0,0,0, 0.4);
        box-shadow: rgba(0,0,0,0.25) 0px 25px 50px 12px;
        border-radius: 0.5rem;
        img{
            height: 15vh;
            width: 15vh;
            object-fit: cover;
            border-radius: 1.5rem;
            padding: 1rem 1rem;
        }
        span{
            font-size: 1rem;
            padding: 0 1rem;
            padding-bottom: 0.5rem;
        }
    }
}
`;

