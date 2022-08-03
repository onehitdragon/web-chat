import { configureStore } from '@reduxjs/toolkit';
import youReducer from "../features/chat/youSlice";
import conversationsReducer from '../features/chat/conversationsSlice'
import socketReducer from '../features/connection/socketSlice';
import storageFireBaseReducer from '../features/chat/storageFireBaseSlice';
import thunkMiddleware from 'redux-thunk';
import groupConversationSettingReducer from '../features/setting/groupConversationSettingSlice';
import searchReducer from '../features/search/searchSlice';
import friendsReducer from '../features/friend/friendsSlice';
import mainMenuReducer from '../features/menu/mainMenuSlice';
import createGroupReducer from '../features/CreateGroup/createGroupSlice';

const store = configureStore({
    reducer: {
        you: youReducer,
        socket: socketReducer,
        conversations: conversationsReducer,
        storageFireBase: storageFireBaseReducer,
        groupConversationSetting: groupConversationSettingReducer,
        search: searchReducer,
        friends: friendsReducer,
        mainMenu: mainMenuReducer,
        createGroup: createGroupReducer
    },
    middleware : [thunkMiddleware]
});

export default store;