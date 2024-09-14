import styled from "styled-components";
import { useEffect, useState } from "react";
import React from 'react';
import { useParams } from "react-router-dom";
import db from '../firebase';
import { doc, getDoc } from "firebase/firestore"; // Import the necessary Firestore functions

export default function Detail() {
    const { id } = useParams(); // Get the 'id' from the URL parameters
    const [detailData, setDetailData] = useState({});

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                // Create a document reference for the specific movie document by its ID
                const docRef = doc(db, 'movie', id); // 'movies' is the collection name, and 'id' is the document ID

                // Fetch the document snapshot
                const docSnap = await getDoc(docRef);

                // If the document exists, set the data in state
                if (docSnap.exists()) {
                    setDetailData(docSnap.data());
                } else {
                    console.log("No such document in Firebase");
                }
            } catch (err) {
                console.log("Error fetching document:", err);
            }
        }
        // console.log(id)
        fetchMovieDetails();
    }, [id]);

    console.log(detailData)
    return (
        <Container>
            <Background>
                <img src={detailData.backgroundImg}
                    alt="" />
            </Background>
            <ImageTitle>
                <img src={detailData.titleImg}
                    alt="" />
            </ImageTitle>
            <ContentMeta>
                <Control>
                    <Player>
                        <img src="/images/play-icon-black.png" alt="" />
                        <span>Play</span>
                    </Player>
                    <Trailer>
                        <img src="/images/play-icon-white.png" alt="" />
                        <span>Trailer</span>
                    </Trailer>
                    <Addlist>
                        <span></span>
                        <span></span>
                    </Addlist>
                    <GroupWatch>
                        <div>
                            <img src="/images/group-icon.png" alt="" />
                        </div>
                    </GroupWatch>
                </Control>
                <Subtitle>
                    {detailData.subTitle}
                </Subtitle>
                <Description>
                    {detailData.description}
                </Description>
            </ContentMeta>
        </Container>
    )
}

const Container = styled.div`
position: relative;
min-height: calc(100vh-250px);
overflow-y: hidden;
display: block;
top: 72px;
padding: 0 calc(3.5vw + 5px);
`;

const Background = styled.div`
left: 0px;
opacity: 0.8;
position: fixed;
right: 0px;
top: 0px;
z-index: -1;


img{
    height: 100vh;
    width: 100vw;
}

@media  (max-width:768px) {
    width: initial;
}
`;

const ImageTitle = styled.div`
display: flex;
align-items: flex-end;
-webkit-box-pack: start;
justify-content: flex-start;
margin: 0px auto;
height: 30vw;
min-height: 170px;
padding-bottom: 24px;
width: 100%;

img{
    max-width: 600px;
    min-width: 200px;
    width: 35vw;
}
`;

const ContentMeta = styled.div`
max-width: 874px;
`;

const Control = styled.div`
align-items: center;
display: flex;
flex-flow: row nowrap;
margin: 24px 0px;
min-height: 56px;
`;

const Player = styled.button`
font-size: 15px;
margin: 0px 22px 0px 0px;
padding: 0 24px;
height: 56px;
border-radius: 7px;
border: none;
background: rgb(249,249,249);
cursor: pointer;
display: flex;
align-items: center;
justify-content: center;
letter-spacing: 1.9px;
text-align: center;
text-transform: uppercase;
color: rgb(0,0,0);

img{
    width: 32px;
}

&:hover{
    background: rgb(198,198,198);
}

@media (max-width:769px) {
    height: 45px;
    padding: 0px 12px;
    font-size: 12px;
    margin: 0px 10px 0px 0px;

    img{
        width: 25px;
    }
}
`;

const Trailer = styled(Player)`
background: rgba(0,0,0,0.3);
border: 1px solid rgb(249,249,249);
color: rgb(249,249,249);
`;

const Addlist = styled.div`
margin: 16px;
height: 42px;
width: 42px;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(0,0,0,0.6);
border-radius: 50%;
border: 1px solid white;
cursor: pointer;

span{
    background-color: rgb(249,249,249);
    display: inline-block;


&:first-child{
    height: 2px;
    transform: translate(1px,0px) rotate(0deg);
    width: 16px;
}   

&:nth-child(2){
    height: 16px;
    transform: translateX(-8px) rotate(0deg);
    width: 2px;
}

}
`;

const GroupWatch = styled.div`
height: 44px;
width: 44px;
border: 1px solid white;
border-radius: 50%;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
background: white;

div{
  height: 40px;
  width: 40px;
  background: rgb(0,0,0);
  border-radius: 50%;

  img{
    width: 100%;
  }
}
`;

const Subtitle = styled.div`
color: rgb(249,249,249);
font-size: 15px;
min-height: 20px;


@media (max-width:768px) {
    font-size: 12px;
}
`;

const Description = styled.div`
line-height: 1.4;
font-size: 20px;
padding: 16px 0px;
color: rgb(249,249,249);

@media (max-width:768px) {
    font-size: 14px;
}
`;