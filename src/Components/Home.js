import styled from 'styled-components';
import React, { useEffect } from 'react';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Originals from './Originals';
import Trending from './Tranding';
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase';
import { setMovies } from '../features/Movie/movieSlice';
import { selectUserName } from '../features/user/userSlice';
import { collection, onSnapshot } from 'firebase/firestore'; // Import Firestore functions

export default function Home() {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  let recommands = [];
  let newDisneys = [];
  let originals = [];
  let trendings = [];

  useEffect(() => {
    // Access the 'movies' collection from Firestore
    const moviesCollectionRef = collection(db, 'movie'); //By this we are accessing the database in fireBase
    // Real-time listener for Firestore changes
    const unsubscribe = onSnapshot(moviesCollectionRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        switch (doc.data().type) {
          case 'recommend':
            recommands = [...recommands, { id: doc.id, ...doc.data() }];
            // console.log(recommands)
            break;
          case 'new':
            newDisneys = [...newDisneys, { id: doc.id, ...doc.data() }];
            // console.log(newDisneys)

            break;
          case 'original':
            originals = [...originals, { id: doc.id, ...doc.data() }];
            break;
          case 'trending':
            trendings = [...trendings, { id: doc.id, ...doc.data() }];
            break;
          default:
            break;
        }
      });
      // console.log(newDisneys)
      // Dispatch the movies to the Redux store
      dispatch(
        setMovies({
          recommand: recommands,
          newDisney: newDisneys,
          trending: trendings,
          original: originals,
        })
      );
    });

    // Cleanup Firestore listener on component unmount
    return () => unsubscribe();
  }, [userName, dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
}

// Styled component for the main container
const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw - 5px);

  &:after {
    background: url('/images/home-background.png') center center / cover no-repeat fixed;
    content: '';
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
