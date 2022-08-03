import { createSlice } from "@reduxjs/toolkit";

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: null,
        questingByOthers: null,
        questingByYous: null
    },
    reducers: {
        loadedFriends(state, action){
            state.friends = action.payload;
        },
        loadedQuestingByOthers(state, action){
            state.questingByOthers = action.payload;
        },
        loadedQuestingByYous(state, action){
            state.questingByYous = action.payload;
        },
        addQuestingByYou(state, action){
            state.questingByYous.push(action.payload);
        },
        addQuestingByOther(state, action){
            state.questingByOthers.push(action.payload);
        },
        removeQuestingByYou(state, action){
            for(let i = 0; i < state.questingByYous.length; i++){
                if(state.questingByYous[i].id === action.payload.id){
                    state.questingByYous.splice(i, 1);
                    break;
                }
            }
        },
        removeQuestingByOther(state, action){
            for(let i = 0; i < state.questingByOthers.length; i++){
                if(state.questingByOthers[i].id === action.payload.id){
                    state.questingByOthers.splice(i, 1);
                    break;
                }
            }
        },
        addFriends(state, action){
            state.friends.push(action.payload);
        }
    }
});

export default friendsSlice.reducer;
export const { loadedFriends, loadedQuestingByOthers, loadedQuestingByYous, addQuestingByYou,
    addQuestingByOther, removeQuestingByYou, removeQuestingByOther,
    addFriends } = friendsSlice.actions;