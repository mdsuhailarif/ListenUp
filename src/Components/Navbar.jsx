import React from 'react';
import styled from 'styled-components';
import {CgProfile} from 'react-icons/cg';
import { useStateProvider } from '../Utils/StateProvider';
import Searchbar from './Searchbar';

export default function Navbar({navBg}) {

    const [{userInfo}] = useStateProvider();
  return (
    <Container navBg={navBg}>
        <div className="image"><img src=".\listenup_black.png" alt="" /></div>
        <Searchbar/>
        <div className="avatar">
            <a href="/">
                <CgProfile/>
                <span>{userInfo?.userName}</span>
            </a>
        </div>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 1.8rem 1rem;
padding-bottom: 1rem;
height: 3.5rem;
position: sticky;
top:0;
transtion: 0.3 ease-in-out;
background:  ${ ({navBg})=>navBg?"linear-gradient(transparent,rgba(0,0,0,0.4))":"none" };
background-color: ${ ({navBg})=>navBg?"rgba(32,87,100)":"none" };
.image{
    display: none;
}
.search_bar{
    background-color:white;
    min-width: 8rem;
    width: 25vw;
    padding: 0.4rem;
    border-radius: 1.5rem;
    display: flex;
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

.avatar{
    background-color: black;
    padding: 0.3rem 0.4rem;
    padding-right: 1rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: white;
        font-weight:bold;
        svg{
            font-size: 1.3rem;
            background-color: #282828;
            padding: 0.2rem;
            border-radius: 1rem;
            color: #c7c5c5;
        }
    }
}

@media(max-width: 860px){
    .image{
        display: block;
        align-items: center;
        img{
            width: 35vw;
            max-width: 12rem;
            block-size: auto;
            padding-bottom: 1rem;
        }
    }
    .search_bar{
        display: none;
    }
}
`;
