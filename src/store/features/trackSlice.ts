import { TrackTypes } from '@/SharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { data } from '@/data';


type initialStateType = {
  currentTrack: TrackTypes | null;
  isPlay: boolean;
  currentPlaylist: TrackTypes[]; 
  shuffle: boolean; 
  repeat: boolean; 
  shuffledPlaylist: TrackTypes[]; 
  currentIndex: number; 
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  currentPlaylist: data, 
  shuffle: false,
  repeat: false,
  shuffledPlaylist: [],
  currentIndex: -1,
};

const trackSlice = createSlice({
  name: 'tracks',  
  initialState,  
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackTypes>) => {
      state.currentTrack = action.payload;    
    }, 
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackTypes[]>) => {
      state.currentPlaylist = action.payload;
    },
    setShuffle: (state, action: PayloadAction<boolean>) => {
      state.shuffle = action.payload;
      if (action.payload && state.currentPlaylist.length > 0) {
        const shuffled = [...state.currentPlaylist].sort(() => Math.random() - 0.5);
        state.shuffledPlaylist = shuffled;
      }
    },
    setRepeat: (state, action: PayloadAction<boolean>) => {
      state.repeat = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    nextTrack: (state) => {
      if (state.currentPlaylist.length === 0) return;
      
      let nextIndex;
      if (state.shuffle && state.shuffledPlaylist.length > 0) {
        const currentIndexInShuffled = state.shuffledPlaylist.findIndex(
          track => track._id === state.currentTrack?._id
        );
        nextIndex = (currentIndexInShuffled + 1) % state.shuffledPlaylist.length;
        state.currentTrack = state.shuffledPlaylist[nextIndex];
      } else {
        const currentIndex = state.currentPlaylist.findIndex(
          track => track._id === state.currentTrack?._id
        );
        nextIndex = (currentIndex + 1) % state.currentPlaylist.length;
        state.currentTrack = state.currentPlaylist[nextIndex];
      }
      state.currentIndex = nextIndex;
    },
    prevTrack: (state) => {
      if (state.currentPlaylist.length === 0) return;
      
      let prevIndex;
      if (state.shuffle && state.shuffledPlaylist.length > 0) {
        const currentIndexInShuffled = state.shuffledPlaylist.findIndex(
          track => track._id === state.currentTrack?._id
        );
        prevIndex = currentIndexInShuffled > 0 
          ? currentIndexInShuffled - 1 
          : state.shuffledPlaylist.length - 1;
        state.currentTrack = state.shuffledPlaylist[prevIndex];
      } else {
        const currentIndex = state.currentPlaylist.findIndex(
          track => track._id === state.currentTrack?._id
        );
        prevIndex = currentIndex > 0 
          ? currentIndex - 1 
          : state.currentPlaylist.length - 1;
        state.currentTrack = state.currentPlaylist[prevIndex];
      }
      state.currentIndex = prevIndex;
    },
  }  
});

export const { 
  setCurrentTrack, 
  setIsPlay, 
  setCurrentPlaylist, 
  setShuffle, 
  setRepeat, 
  setCurrentIndex,
  nextTrack,
  prevTrack
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;