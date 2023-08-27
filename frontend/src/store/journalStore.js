import {createSlice} from '@reduxjs/toolkit';
import axios from "axios"
const STATUSES = Object.freeze({
    IDLE:"idle",
    LOADING:"loading",
    ERROR:"error"
})

const journalSlice = createSlice({
    name:"jornal",
    initialState:{
        data : [],
        status:STATUSES.IDLE
    },
    reducers:{
        addJournal(state,action){
            state.data =  action.payload
        },
        setStatus(state,action){
            state.status = action.payload
        }
    }
})
export const {addJournal,setStatus} = journalSlice.actions;
export default journalSlice.reducer;

export function fetchJournal(id){
     return async  function fetchJournalThunk(dispatch,getState){
            console.log(getState())
            const {data}= await axios.get(`http://localhost:5000/boardData/${id}`);
            dispatch(addJournal(data));
     }
}