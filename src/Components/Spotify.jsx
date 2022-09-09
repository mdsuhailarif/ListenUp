import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Body from './Body';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './footer';
import { useStateProvider } from '../Utils/StateProvider';
import { reducerCases } from '../Utils/Constants';
import axios from 'axios';
import Alertbox from './Alertbox';
import {Routes,Route} from 'react-router-dom';
import Home from './Home';


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
            <Alertbox/>
            <div className='spotify_body'>
                <div className="sidebar"><Sidebar/></div>
                <div className="body" ref={bodyRef} onScroll={bodyScrolled}>
                    <Navbar navBg={navBg} />
                    <div className="body_contents">
                        <Routes>
                            <Route path='/body' element={<Body headerBg={headerBg} />}/>
                            <Route path='/' element={<Home/>}/>
                        </Routes>
                    </div>
                </div>
            </div>
            <div className="spotify_footer">
                <Footer/>
            </div>
            <div className="sidebar2"><Sidebar/></div>
        </Container>
    )
}

const Container = styled.div`
max-width: 100vw;
maxheight: 100vh;
overflow: hidden;
font-weight:400;
display: grid;
grid-template-rows: 87vh 13vh;
.spotify_body {
    font-family: var(--font-family,CircularSp,CircularSp-Arab,CircularSp-Hebr,CircularSp-Cyrl,CircularSp-Grek,CircularSp-Deva,var(--fallback-fonts,sans-serif));
    font-weight: 700;
    font-size: 0.875rem;
    display: grid;
    grid-template-columns: 15vw 85vw;
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
        ::-webkit-scrollbar-track {
            margin-right:1rem;
          }
    }
}
.sidebar2{
    display:none;
}

@media (max-width: 860px) { 
    display: grid;
    grid-template-rows: 85vh 9vh 6vh;
    .spotify_body{
        display: grid;
        grid-template-columns: 100vw;
        .sidebar{
            display:none;
        }
        .body{
            &::-webkit-scrollbar{
                display:none;
            }
        }
    }
    .sidebar2{
        display:block;
    }
    
}
@media(max-width: 600px){
    grid-template-rows: 79vh 9vh 6vh;
}


`;