import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from "react-redux";
import withHomeLoading from "../hoc/withHomeLoading";
import BodyMain from './BodyMain';
import { checkStatus } from '../features/chat/youSlice';
import { buildSocket } from '../features/connection/socketSlice';
import { loadConversaions } from '../features/chat/conversationsSlice';
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
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const showFriendSearchMain = useSelector<RootState, boolean>(state => state.mainMenu.showFriendSearchMain);
    const showGroupCreationMain = useSelector<RootState, boolean>(state => state.mainMenu.showGroupCreationMain);
    const showCallVideoMain = useSelector<RootState, boolean>(state => state.mainMenu.showCallVideoMain);

    useEffect(() => {
        const navigateToLogin = () => {
            navigate("/");
        }
        const showHomePage = () => {
            dispatch(buildSocket({ url: BASE_URL + '/chat' }));
            dispatch<any>(buildConnection);
            dispatch<any>(loadConversaions(() => {
                dispatch<any>(startSocket(() => {
                    setLoading(false);
                }));
            }));
        }
        dispatch<any>(checkStatus(showHomePage, navigateToLogin));

        // eslint-disable-next-line
    }, []);

    return (
        <div className="body">
            <BodyMainWithHomeLoading isLoading={loading}/>
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