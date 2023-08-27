import {configureStore} from '@reduxjs/toolkit';
import journalReducer from './journalStore'
const store = configureStore({
    reducer:{
        journal : journalReducer,
    }
})

export default store