import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  plantArray: [],
  planted: 0,
  greenhouseFull: false,
  growing: false,
  season: 'SPRING',
  gameCount: 0,
  maxGameCount: 50,
  yield: {
    SPRING: 0,
    SUMMER: 0,
    FALL: 0,
  },
  sourceArrayLength: 9,
  playerHistory: [
    100,
    200,
    300,
  ],
  showHistory: false,
};


export const greenhouseSlice = createSlice({
  name: 'greenhouse',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    plant: (state, action) => {
      state.plantArray[action.payload.index] = action.payload.plant;
      state.planted = state.plantArray.filter((element) => element !== null).length;
    },
    setGreenhouseFull: (state, action) => {
      state.greenhouseFull = action.payload;
    },
    resetGreenhouse: (state, action) => {
      state.plantArray = [];
    },
    startGrowing: (state, action) => {
      state.growing = true;
    },
    stopGrowing: (state,action) => {
      state.growing = false;
    },
    setSeason: (state,action) => {
      state.season = action.payload;
    },
    setGameCount: (state,action) => {
      state.gameCount = action.payload;
    },
    incGameCount: (state,action) => {
      state.gameCount = state.gameCount + 1;
    },
    setYieldSpring: (state, action) => {
      state.yield.SPRING = action.payload;
    },
    setYieldSummer: (state, action) => {
      state.yield.SUMMER = action.payload;
    },
    setYieldFall: (state, action) => {
      state.yield.FALL = action.payload;
    },
    resetYield: (state, action) => {
      state.yield = {
        SPRING: 0, 
        SUMMER: 0,
        FALL: 0
      }
    },
    resetPlanted: (state, action) => {
      state.planted = 0;
    },
    addScoreToPlayerHistory: (state, action) => {
      state.playerHistory.push(action.payload);
    },
    toggleHistory: (state, action) => {
      state.showHistory = !state.showHistory;
    }

    // removeDisconnectedUser: (state, action) => {
    //   state.onlineUsers = state.onlineUsers.filter(onlineUser => onlineUser.socketId !== action.payload);
    // },
  },

});

export const { plant, 
  setGreenhouseFull, 
  resetGreenhouse, 
  startGrowing, 
  stopGrowing, 
  setSeason, 
  setGameCount, 
  incGameCount, 
  setYieldSpring, 
  setYieldSummer, 
  setYieldFall, 
  resetYield, 
  resetPlanted, 
  addScoreToPlayerHistory,
  toggleHistory } = greenhouseSlice.actions;

export default greenhouseSlice.reducer;
