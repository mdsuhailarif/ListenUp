import React, { useState } from 'react'
import styled from 'styled-components';
import { IoLibrary } from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from 'react-icons/md';
import Playlist from './Playlist';
import {Link} from "react-router-dom";
import Navbar from './Navbar';

export default function Sidebar() {
    
    const [show,setshow]  = useState(false);
    const [focus,setFocus]  = useState(false);

    const showPlaylists = (display) => {
        display?setshow(true):setshow(false);
    };

        const play = () => {
            showPlaylists(true);
        };
   
    return (
        <Container>
            <div className="top_links">
                <div className="logo">
                    <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png" alt="spotify" />
                </div>
                <ul>
                    <li onClick={()=>showPlaylists(false)}>
                        <Link to="/" style={{ textDecoration: 'none' }}><MdHomeFilled /> 
                        <span> Home</span>
                        </Link>
                    </li>
                    <li >
                        <Link to="" style={{ textDecoration: 'none' }}>
                        <MdSearch/>
                        <span> Search</span>
                        </Link>
                    </li>
                    <li onClick={play}>
                        <Link to="/body" style={{ textDecoration: 'none' }}>
                        <IoLibrary/>
                        <span> Your Playlists</span>
                        </Link>
                    </li>
                </ul>
                <div className="playlists">
                <Playlist show={show} />
                </div>
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
            width:4rem;
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
        font-size: 1.3vw;
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
@media (max-width: 860px){
height: 100%;
width: 100%;
border-top: 1px solid #282828;
align-items: center;
justify-content: center;
padding: 0 1rem;
.top_links {
    .logo{
        display:none;
    }
    ul{
        position: fixed;
        bottom:-29px;
        left: 50px;
        list-style-type: none;
        display: grid;
        grid-template-columns: 1fr 1fr 5fr;
        align-items: center;
        justify-content: center;
        padding: 0 0;
        gap: 25vw;
        font-size: 3.5vh;
        li{
            align-items: center;
            justify-content: center;
            padding: 0 0;
            cursor: pointer;
            transition: 0.3s ease-in-out;
            span{
                display:none;
            }
        }  
    }
    .playlists{
        display: none;
    }
}
}
`;