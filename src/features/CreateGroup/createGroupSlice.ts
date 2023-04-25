import { createSlice } from "@reduxjs/toolkit";

interface CreateGroupState{
    nameGroup: String,
    invites: User[]
}

const init: CreateGroupState = {
    nameGroup: "",
    invites: []
}

const createGroupSlice = createSlice({
    name: "createGroup",
    initialState: init,
    reducers: {
        updateNameGroup(state, action: { payload: string }){
            state.nameGroup = action.payload;
        },
        toggleInvite(state, action: { payload: User }){
            const result = state.invites.find((invite, index) => {
                if(invite.id === action.payload.id){
                    state.invites.splice(index, 1);
                    return true;
                }
                return false;
            });
            if(!result){
                state.invites.push(action.payload);
            }
        },
        reset(state, action){
            state.nameGroup = "";
            state.invites = [];
        }
    }
});

export default createGroupSlice.reducer;
export const { updateNameGroup, toggleInvite, reset } = createGroupSlice.actions;