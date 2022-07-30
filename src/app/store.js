import { configureStore } from '@reduxjs/toolkit';
import youReducer from "../features/chat/youSlice";
import conversationsReducer from '../features/chat/conversationsSlice'
import socketReducer from '../features/connection/socketSlice';
import storageFireBaseReducer from '../features/chat/storageFireBaseSlice';
import thunkMiddleware from 'redux-thunk';
import groupConversationSettingReducer from '../features/setting/groupConversationSettingSlice';

const store = configureStore({
    reducer: {
        you: youReducer,
        socket: socketReducer,
        conversations: conversationsReducer,
        storageFireBase: storageFireBaseReducer,
        groupConversationSetting: groupConversationSettingReducer
    },
    middleware : [thunkMiddleware]
});

export default store;