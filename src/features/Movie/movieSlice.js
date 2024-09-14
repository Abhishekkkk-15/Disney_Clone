import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    recommand:null,
    newDisney:null,
    original:null,
    trending:null,
};

const movieSlice = createSlice({
    name:"movie",
    initialState,
    reducers:{
        setMovies:(state,action) =>{
            state.recommand = action.payload.recommand;
            state.newDisney = action.payload.newDisney;
            state.original = action.payload.original;
            state.trending = action.payload.trending;
        },
    },
});

export const {setMovies} = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommand;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOrigninal = (state) => state.movie.original;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer;