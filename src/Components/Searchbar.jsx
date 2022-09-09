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
.search_bar{
    background-color:white;
    padding: 0.4rem;
    border-radius: 1.5rem;
    display: none;
    align-items: center;
    gap: 0.5rem;
    input{
        border: none;
        height: 1.2rem;
        width: 100%;
        &:focus {
            outline:none;
        }
    }
}
@media(max-width: 860px){
    .search_bar{
        margin: 1rem;
        padding: 1rem;
        display:flex;
    }
}

`;