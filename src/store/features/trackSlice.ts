import { TrackTypes } from '@/SharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type initialStateType = {
  currentTrack: TrackTypes | null;
  isPlay: boolean
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay:false
};

const trackSlice = createSlice({
  name: 'tracks',  
  initialState,  
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackTypes>) => {
    state.currentTrack = action.payload;    
    }, 
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload
    }
  }  
});

export const { setCurrentTrack, setIsPlay } = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;