import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useSelector, useDispatch } from "react-redux"
import withHomeLoading from "../hoc/withHomeLoading";
import BodyMain from './BodyMain';

function Home(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const socket = useSelector(state => state.socket);
    const login = useSelector(state => state.login);
    const [loading, setLoading] = useState(true);
    const BodyMainWithHomeLoading = withHomeLoading(BodyMain, loading);

    useEffect(() => {
        dispatch({
            type: "initState"
        });

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(login.loginStatus === "nologin"){
            navigate("/");
        }
        
        // eslint-disable-next-line
    }, [login.loginStatus]);

    useEffect(() => {
        if(socket !== null){
            if(loading){
                setLoading(false);
            }
        }
    }, [socket, loading]);

    return (
        <div className="body">
            <BodyMainWithHomeLoading />
        </div>
    );
}

export default Home;