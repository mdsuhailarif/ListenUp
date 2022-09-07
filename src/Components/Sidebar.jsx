import React from 'react'
import styled from 'styled-components';
import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import Playlist from './Playlist';
import {Link} from "react-router-dom";

export default function Sidebar() {
    return (
        <Container>
            <div className="top_links">
                <div className="logo">
                    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="spotify" />
                </div>
                <ul>
                    <li>
                        <Link to="/"><MdHomeFilled />
                        <span> Home</span>
                        </Link>
                    </li>
                    <li>
                        <MdSearch />
                        <span> Search</span>
                    </li>
                    <li>
                        <Link to="/body">
                        <IoLibrary />
                        <span> Your Playlists</span>
                        <Playlist />
                        </Link>
                    </li>
                </ul>
            </div>
        </Container>
    )
}

const Container = styled.div`
align-item: center;
justify-content: center;
background-color: black;
color: #b3b3b3;
display: flex;
flex-direction: column;
height: 100%;
width: 100% ;
.top_links {
    diplay: flex;
    flex-direction: column;
    overflow: hidden;
    .logo{
        text-align: center;
        margin: 1rem 0;
        img{
            max-inline-size: 80%;
            block-size: auto;
        }
    }
    ul{
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        max-height: 100%;
        li{
            padding: 0 0.3rem;
            diplay: flex;
            gap: 1rem;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            &:hover{
                color:white;
            }
        }  
    }
}
`;