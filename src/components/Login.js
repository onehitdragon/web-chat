import './Login.css';
import {useEffect, useState} from 'react';
import Dialog from './Dialog';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import { checkStatus, login } from '../app/features/chat/youSlice';

function Login({showDialog, hideDialog}) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [pageLoading, setPageLoading] = useState(true);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const navigateToHome = () => {
            navigate("/Home");
        };
        const showLoginPage = () => {
            setPageLoading(false);
        };
        dispatch(checkStatus(navigateToHome, showLoginPage));

        // eslint-disable-next-line
    }, []);

    const handleLoginButtonClick = () => {
        setLoading(true);
        const processResponse = (res) => {
            let dialog;
            res.then((data) => {
                console.log(data);
                if(data.errorConnection){
                    dialog = <Dialog srcImg='/img/layout/fail.png' title='Lỗi kết nối' content='Server mất kết nối' handleAgree={hideDialog} handleCancer={hideDialog}/>;
                }
                else if(data.isSuccess){
                    dialog = <Dialog srcImg='/img/layout/success.png' title='Thành công' content='Đăng nhập thành công' handleAgree={handleLoginSuccess} handleCancer={hideDialog}/>;
                }
                else{
                    dialog = <Dialog srcImg='/img/layout/fail0.png' title='Thất bại' content='Sai tài khoản hoặc mật khẩu' handleAgree={hideDialog} handleCancer={hideDialog}/>;
                }
            })
            .catch((e) => {
                console.log(e);
                dialog = <Dialog srcImg='/img/layout/fail.png' title='Lỗi kết nối' content='Server mất kết nối' handleAgree={hideDialog} handleCancer={hideDialog}/>;
            })
            .finally(() => {
                showDialog(dialog);
                setLoading(false);
            })
        }
        dispatch(login(email, password, processResponse));
    }

    const handleLoginSuccess = () => {
        navigate("/Home");
        hideDialog();
    }

    return (
        !pageLoading &&
        <div className="body">
            <div className="body__main">
                <p className="title">Đăng Nhập</p>
                <p className="title-2">Đăng nhập với</p>
                <div className="other-login">
                    <div>
                        <i className="fa-brands fa-facebook-f"></i>
                        <a href="/">Facebook</a>
                    </div>
                    <div>
                        <i className="fa-brands fa-google"></i>
                        <a href="/">Google</a>
                    </div>
                </div>
                <p className="title-2">Hoặc sử dụng tài khoản của bạn</p>
                <form className="login-form">
                    <div className="login-form__row login-form__row--normal">
                        <input name="Email" value={ email } onChange={(e) => { setEmail(e.target.value); }} type="text" placeholder="Email" />
                    </div>
                    <div className="login-form__row login-form__row--normal">
                        <input name="Password" value={ password } onChange={(e) => { setPassword(e.target.value); }} type="password" placeholder="Mật khẩu" />
                    </div>
                    <div className="login-form__row login-form__row--custom">
                        <div>
                            <input name="SavePassword" type="checkbox"/> Nhớ mật khẩu
                        </div>
                        <div>
                            <a href="/">Quên mật khẩu</a>
                        </div>
                    </div>
                    <img style={{display: loading ? 'block' : 'none'}} className="loading" src="/img/gif/loader.gif" alt="error"/>
                    {!loading && <button type="button" name="login" onClick={handleLoginButtonClick}>Đăng nhập</button>}
                    <button type="button" name="register">Đăng ký</button>
                </form>
            </div>
        </div>
    );
}

export default Login;