import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { useDispatch, useSelector } from "react-redux";
import withHomeLoading from "../hoc/withHomeLoading";
import BodyMain from './BodyMain';
import { buildSocket } from '../features/connection/socketSlice';
import { startSocket } from '../features/connection/socketSlice';
import FriendSearchMain from './FriendSearchMain';
import GroupCreationMain from './GroupCreationMain';
import CallVideoDialog from './CallVideoDialog';
import CallVideoMain from './CallVideoMain';
import { buildConnection } from '../features/VideoCall/videoCallSlice';
import { BASE_URL } from '../tools/doRequestApi';
import { RootState } from '../app/store';

const BodyMainWithHomeLoading = withHomeLoading(BodyMain);
function Home() {
    const dispatch = useDispatch();
    const showFriendSearchMain = useSelector<RootState, boolean>(state => state.mainMenu.showFriendSearchMain);
    const showGroupCreationMain = useSelector<RootState, boolean>(state => state.mainMenu.showGroupCreationMain);
    const showCallVideoMain = useSelector<RootState, boolean>(state => state.mainMenu.showCallVideoMain);
    
    useEffect(() => {
        const showHomePage = () => {
            dispatch(buildSocket({ url: BASE_URL + '/chat' }));
            dispatch<any>(buildConnection);
            dispatch<any>(startSocket(() => {
                
            }));
        }
        dispatch<any>(showHomePage);

        // eslint-disable-next-line
    }, []);

    return (
        <div className={styles.body}>
            <BodyMainWithHomeLoading isLoading={false}/>
            {
                showFriendSearchMain &&
                <FriendSearchMain />
            }
            {
                showGroupCreationMain &&
                <GroupCreationMain />
            }
            <CallVideoDialog />
            {
                showCallVideoMain &&
                <CallVideoMain />
            }
        </div>
    );
}

export default Home;