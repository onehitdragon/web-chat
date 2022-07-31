import { createSlice } from "@reduxjs/toolkit";

const groupConversationSettingSlice = createSlice({
    name: "groupConversationSetting",
    initialState: {
        isShowParticipants: false
    },
    reducers: {
        toggleShowParticipants(state, action){
            state.isShowParticipants = !state.isShowParticipants;
        }
    }
});

export default groupConversationSettingSlice.reducer;
export const { toggleShowParticipants } = groupConversationSettingSlice.actions;