import React from 'react';
import styled from 'styled-components';
import Body from './Body';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './footer';

export default function Spotify() {
    return (
        <Container>
            <div className='spotify_body'>
                <Sidebar />
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

`;