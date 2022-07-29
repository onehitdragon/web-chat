import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useDispatch } from "react-redux";
import withHomeLoading from "../hoc/withHomeLoading";
import BodyMain from './BodyMain';
import { checkStatus } from '../features/chat/youSlice';
import { buildSocket } from '../features/connection/socketSlice';
import { loadConversaions } from '../features/chat/conversationsSlice';
import { startSocket } from '../features/connection/socketSlice';

function Home(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const BodyMainWithHomeLoading = withHomeLoading(BodyMain, loading);

    useEffect(() => {
        const navigateToLogin = () => {
            navigate("/");
        }
        const showHomePage = () => {
            dispatch(buildSocket({url: 'http://127.0.0.1:5001/chat'}));
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
            <BodyMainWithHomeLoading />
        </div>
    );
}

export default Home;