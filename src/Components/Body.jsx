import React, { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { AiFillClockCircle } from 'react-icons/ai';
import { useStateProvider } from '../Utils/StateProvider';
import { reducerCases } from '../Utils/Constants';


export default function Body({ headerBg }) {

    const [{ token, selectedPlaylist,selectedPlaylistId}, dispatch] = useStateProvider();
    useEffect(() => {
        const getInitialPlaylist = async () => {
            const id=selectedPlaylistId;
            const response = await axios.get(
                `https://api.spotify.com/v1/playlists/${id}`,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    }
                }
            );


            const selectedPlaylist = {
                id: response.data.id,
                name: response.data.name,
                description: response.data.description.startsWith("<a") ?
                    "" : response.data.description,
                image: response.data.images[0].url,
                tracks: response.data.tracks.items.map(({ track }) => ({
                    id: track.id,
                    name: track.name,
                    artists: track.artists.map((artist) => artist.name),
                    image: track.album.images[2].url,
                    duration: track.duration_ms,
                    album: track.album.name,
                    context_uri: track.album.uri,
                    track_number: track.track_number,
                    preview_url: track.preview_url
                }))
            };
            dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
        };
        getInitialPlaylist();
    }, [token,selectedPlaylistId, dispatch])

    const mstoMinAndSec = (ms) => {
        const min = Math.floor(ms / 60000);
        const sec = Math.floor((ms % 60000) / 1000).toFixed(0);
        return (min + ":" + (sec < 10 ? "0" + sec : sec));
    }

    const updateCurrentTrack = async (index,id, name, artists, image, preview_url) => {
        const currentPlaying = {
            index: index,
            id: id,
            name: name,
            artists: artists,
            image: image,
            preview_url: preview_url?preview_url:null
        };
        dispatch({ type: reducerCases.SET_PLAYLING, currentPlaying });
        dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: false });
    }

    return (
        <Container headerBg={headerBg}>
            {
                selectedPlaylist && (
                    <>
                        <div className='playlist'>
                            <div className='image'>
                                <img src={selectedPlaylist.image} alt='selectedPlaylist' />
                            </div>
                            <div className="details">
                                <span className='type'>PLAYLIST</span>
                                <h1 className='title'>{selectedPlaylist.name}</h1>
                                <p className='description'>{selectedPlaylist.description}</p>
                            </div>
                        </div>
                        <div className="list">
                            <div className="header_row">
                                <div className="col">
                                    <span>#</span>
                                </div>
                                <div className="col">
                                    <span>TITLE</span>
                                </div>
                                <div className="col">
                                    <span>ALBUM</span>
                                </div>
                                <div className="col">
                                    <span>
                                        <AiFillClockCircle></AiFillClockCircle>
                                    </span>
                                </div>
                            </div>
                            <div className="tracks">
                                {
                                    selectedPlaylist.tracks.map(({
                                        id,
                                        name,
                                        artists,
                                        image,
                                        duration,
                                        album,
                                        preview_url
                                    }, index) => {
                                        return (
                                            <div className="row" key={id} onClick={() => updateCurrentTrack(index,id, name, artists, image, preview_url)} >
                                                <div className="col">
                                                    <span>{index + 1}</span>
                                                </div>
                                                <div className="col detail">
                                                    <img src={image} alt="{name}" />
                                                    <div className="info" >
                                                        <span className="name" >{name}</span>
                                                        <div className="artist">{artists.join(", ")}</div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <span>{album}</span>
                                                </div>
                                                <div className="col">
                                                    <span>{mstoMinAndSec(duration)}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </>
                )
            }
        </Container>
    )
}

const Container = styled.div`
.playlist{
    margin: 0 2rem;
    display: flex;
    align-items:center;
    gap:1rem;
    .image{
        img{
            margin-top: -0.5rem;
            height: 12rem;
            width: 12rem;
            object-fit: cover;
            box-shadow: rgba(0,0,0,0.25) 0px 25px 50px 12px;
        }
    }
    .details{
        diplay: flex;
        flex-direction: column;
        justify-content: flex-end;
        color: #e0dede;
        .type{
            font-size: 0.7rem;
        }
        .title{
            color: white;
            font-size: 4rem;
        }
        .description{
            color: #b3b3b3;
        }
    }
}
.list{
    .header_row{
        display: grid;
        grid-template-columns:0.3fr 3fr 2.1fr 0.5fr;
        gap:1rem;
        color: #b3b3b3;
        margin: 1rem 0 0 0;
        position: sticky;
        top: 7rem;
        padding: 1rem 3rem;
        transition: 0.3s ease-in-out;
        border-bottom: 1px solid hsla(0,0%,100%,.1);
        background-color: ${({ headerBg }) => headerBg ? "rgba(0,0,0,0.97)" : "none"};
    }
    
    .tracks{
        margin: 0.5rem 2rem;
        display: flex;
        flex-direction: column;
        margin-bottom: 5rem;
        gap: 0.4rem;
        .row{
            padding: 0.5rem 1rem;
            display:grid;
            grid-template-columns:0.3fr 3fr 2.1fr 0.5fr;
            gap:1rem;
            color: #b3b3b3;
            &:hover{
                background-color: rgba(0,0,0,0.7);
                color: #dddcdc;
            }
            .col{
                display:flex;
                align-items:center;
                white-space:nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
                img{
                    height:40px;
                }
            }
            .detail{
                display: flex;
                gap: 1rem;
                
                .info{
                    display:flex;
                    flex-direction: column;
                    gap:0.5rem;
                    
                    .name{
                        color: #dddcdc;
                        &:hover{
                            text-decoration: underline;
                            }
                    }
                    .artist{
                        font-size: 0.8rem;
                        &:hover{
                            text-decoration: underline;
                            }
                    }
                }
            }
        }
    }
}
`;
