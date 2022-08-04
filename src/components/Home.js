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
import CallVideoMain from './CallVideoMain';

const BodyMainWithHomeLoading = withHomeLoading(BodyMain);
function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const showFriendSearchMain = useSelector(state => state.mainMenu.showFriendSearchMain);
    const showGroupCreationMain = useSelector(state => state.mainMenu.showGroupCreationMain)

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
            {
                showGroupCreationMain &&
                <GroupCreationMain />
            }
            {/* <div className='wrapper'>
                <div className="dialog">
                    <div className='info-area'>
                        <img className='avatar' alt='error' src='https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png'/>
                        <p className='name'>Nguyễn B</p>
                        <p className='status'>Đang gọi...</p>
                    </div>
                    <div className='button-area'>
                        <button className='button--green'>
                            <i className="fa-solid fa-phone"></i>
                        </button>
                        <button className='button--red button--rotate-133'>
                            <i className="fa-solid fa-phone"></i>
                        </button>
                    </div>
                </div>
            </div> */}
            <CallVideoMain />
        </div>
    );
}

export default Home;