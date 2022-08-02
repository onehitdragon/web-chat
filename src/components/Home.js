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

const BodyMainWithHomeLoading = withHomeLoading(BodyMain);
function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const showFriendSearchMain = useSelector(state => state.friends.showFriendSearchMain);

    useEffect(() => {
        const navigateToLogin = () => {
            navigate("/");
        }
        const showHomePage = () => {
            dispatch(buildSocket({ url: 'http://127.0.0.1:5001/chat' }));
            dispatch(loadConversaions(() => {
                dispatch(startSocket(() => {
                    setLoading(false);
                }));
            }));
        }
        dispatch(checkStatus(showHomePage, navigateToLogin));

        // eslint-disable-next-line
    }, []);

    return (
        <div className="body">
            <BodyMainWithHomeLoading isLoading={loading}/>
            {
                showFriendSearchMain &&
                <FriendSearchMain />
            }
        </div>
    );
}

export default Home;