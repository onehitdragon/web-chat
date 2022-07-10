import { createSlice } from "@reduxjs/toolkit";

const currentConversationSlice = createSlice(
    {
        name: "currentConversation",
        initialState: null,
        reducers: {
            setCurrentConversation: (state, action) => {
                return action.payload.currentConversation;
            },
            addNewMessage: (state, action) => {
                const newMessage = action.payload.newMessage;
                state.messages.push(newMessage);
                state.scroll = undefined;
            },
            setScroll: (state, action) => {
                state.scroll = action.payload;
            }
        }
    }
);

export default currentConversationSlice.reducer;
export const { setCurrentConversation, addNewMessage, setScroll } = currentConversationSlice.actions;