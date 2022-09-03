import React, { useEffect } from 'react';
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
                <div className="body">
                    <Navbar/>
                    <div className="body_contents">
                        <Body />
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
display: grid;
grid-template-rows: 85vh 15vh;
.spotify_body {
    display: grid;
    grid-template-columns: 19vw 81%;
    height: 100%;
    width:100%;
    background: linear-gradient(transparent,rgba(0,0,1));
    background-color: rgba(32,87,100);
    .body{
        height: 100%;
        width: 100%;
        overflow: auto;
    }
}
`;