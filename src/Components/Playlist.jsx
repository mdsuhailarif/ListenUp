import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { reducerCases } from '../Utils/Constants';
import { useStateProvider } from '../Utils/StateProvider';


export default function Playlist({show}) {

    const [{ token, playlists}, dispatch] = useStateProvider();
    useEffect(() => {
        const getPlaylistData = async () => {
            const response = await axios.get(
                'https://api.spotify.com/v1/me/playlists',
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );
            const { items } = response.data;
            const playlists = items.map(({ name, id, images }) => {
                return { name, id, images };
            });
            dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
        };
        getPlaylistData();
    }, [token, dispatch])

     const selectPlaylist = async(selectedPlaylistId) => {
        dispatch({ type: reducerCases.SET_PLAYLISTID, selectedPlaylistId });
    };

    return (
        <Container show={show}>
            <ul>
                {playlists.map(({ name, id }) => <li key={id}  onClick={ ()=> selectPlaylist(id) }>{name}</li>)}
            </ul>
        </Container>
    )
}

const Container = styled.div`
ul{
    opacity: ${ ({show})=>show?"1":"0" };
    border-top: 1px solid;
    border-color: #b3b3b3;
    overflow: auto;
    height:50vh;
    &::-webkit-scrollbar{
        &-thumb {
            background-color:rgba(255,255,255,0.6);
        }
    }
}
`;