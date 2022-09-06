import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Body from './Body';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './footer';
import { useStateProvider } from '../Utils/StateProvider';
import { reducerCases } from '../Utils/Constants';
import axios from 'axios';


export default function Spotify() {

    const [{token}, dispatch]  = useStateProvider();
    const bodyRef = useRef();
    const [navBg,setNavBg]  = useState(false);
    const [headerBg,setHeaderBg]  = useState(false);

    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ?
        setNavBg(true):setNavBg(false);
        bodyRef.current.scrollTop >= 243 ?
        setHeaderBg(true):setHeaderBg(false);
    }

    useEffect(() => {
        const getUserInfo = async () => {
            const {data} = await axios.get(
                'https://api.spotify.com/v1/me',
            {
                headers: {
                    Authorization: "Bearer "+ token,
                    "Content-Type": "application/json"
                }
            }
            );
            const userInfo = {
                userId: data.id,
                userName: data.display_name
            };
            dispatch( {type: reducerCases.SET_USERINFO, userInfo} );
        };
        getUserInfo();
    },[token,dispatch])
    

    return (
        <Container>
            <div className='spotify_body'>
                <Sidebar/>
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBg={navBg} />
                    <div className="body_contents">
                        <Body headerBg={headerBg} />
                    </div>
                </div>
            </div>
            <div className="spotify_footer">
                <Footer/>
            </div>
        </Container>
    )
}

const Container = styled.div`
max-width: 100vw;
maxheight: 100vh;
overflow: hidden;
font-weight:400;
display: grid;
grid-template-rows: 85vh 15vh;
.spotify_body {
    font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
    font-weight: 700;
    font-size: 0.875rem;
    display: grid;
    grid-template-columns: 21vw 79vw;
    height: 100%;
    width:100%;
    background: linear-gradient(transparent,rgba(0,0,1));
    background-color: rgba(32,87,100);
    .body{
        font-weight: 400;
        font-size:1rem;
        height: 100%;
        width: 100%;
        overflow: auto;
        &::-webkit-scrollbar{
            
            width: 0.7rem;
            &-thumb {
                        background-color:rgba(255,255,255,0.2);
                    }
        }
    }
}
`;