import React from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';

export default function Searchbar() {
    return(
        <Container>
        <div className="search_bar">
        <FaSearch/>
        <input type="text" placeholder='Artists, Songs, or podcasts'/>
        </div>
        </Container>
    )
}

const Container = styled.div`
@media(max-width: 860px){
   
}

`;