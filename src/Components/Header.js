import React, { useEffect } from "react";
import styled from "styled-components";
//FireBase Related Import's
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
//Redux Related Import's
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  selectUserName,
  selectUserPhoto,
  setSingOutState,
  setUserLoginDetails
} from '../features/user/userSlice'

export default function Header(props) {
  //  this are the Redux tool's 
  const dispatch = useDispatch();
  const history = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        history("/home")
      }
    });
  }, [userName])


  const handleAuth = () => {
    if(!userName){signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
      })
      .catch((error) => {
        alert(error.message);
      });}
      else if(userName){
        auth.signOut().then(()=>{
          dispatch(setSingOutState());
          history('/')
        })
        .catch((err) => alert(err.message));
      }
  };

  const setUser = (user) => {
    dispatch(
      setUserLoginDetails({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      })
    )
  }



  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" />
      </Logo>
      {!userName ? <Login onClick={handleAuth}>Login</Login> :
        <>
          <NavMenu>
            <a href="/home">
              <img src="/images/home-icon.svg" />
              <span>Home</span>
            </a>
            <a href="/search">
              <img src="/images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a href="/watchlist">
              <img src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a href="/orignials">
              <img src="/images/original-icon.svg" />
              <span>ORIGINALS</span>
            </a>
            <a href="/movies">
              <img src="/images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>
            <a href="/series">
              <img src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SingOut>
            <UserImg src={userPhoto} alt={userName} />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SingOut>
        </>}
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  /* flex-flow: row-reverse; */
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0 0 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        opacity: 0;
        position: absolute;
        right: 0px;
        left: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.96) 0s;
        visibility: hidden;
        width: auto;
      }
    }
    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
height: 40px;
display: flex;
justify-content: center;
align-items: center;
width: 78px;
background-color: rgba(0, 0, 0, 0.6);
padding: 8px, 16px;
text-transform: uppercase;
letter-spacing: 1px;
border: 1px solid #f9f9f9;
border-radius: 4px;
transition: all 0.2s ease;
font-weight: 500;

&:hover{
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
}

`;

const UserImg = styled.img`
height: 100%;
`;

const DropDown = styled.div`
position: absolute;
top: 40px;
right:0px;
background: rgb(19,19,19);
border: 1px solid rgba(151,151,151,0,34);
border-radius: 4px;
box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
padding:10px;
font-size: 14px;
letter-spacing: 3px;
width: 100px;
opacity: 0;
`;

const SingOut = styled.div`
position: relative;
height: 40px;
width: 40px;
display: flex;
cursor: pointer;
align-items: center;
justify-content: center;


${UserImg}{
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

&:hover{
  ${DropDown}{
  opacity: 1;
  transition-duration: 1s;
}}
`;