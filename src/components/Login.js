import './Login.css';
import {useState} from 'react';
import Dialog from './Dialog';
import {useNavigate} from 'react-router-dom';

function Login({showDialog, hideDialog}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate("/Home");
        hideDialog();
    }

    const handleLoginButtonClick = () => {
        setLoading(true);
        fetch('http://127.0.0.1:5000/api/account/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `email=${email}&password=${password}`
        })
        .then((res) => {
            if(!res.ok) throw new Error("error");
            return res.json();
        })
        .then((data) => {
            console.log(data);
            if(data.emailIsValid && data.passwordIsValid){
                const dialogLoginSuccess = <Dialog srcImg='/img/layout/success.png' title='Thành công' content='Đăng nhập thành công' handleAgree={handleLoginSuccess} handleCancer={hideDialog}/>;
                showDialog(dialogLoginSuccess);
            }
            else{
                const dialogLoginFail = <Dialog srcImg='/img/layout/fail0.png' title='Thất bại' content='Sai tài khoản hoặc mật khẩu' handleAgree={hideDialog} handleCancer={hideDialog}/>;
                showDialog(dialogLoginFail);
            }
            setLoading(false);
        })
        .catch((e) => {
            const dialogLoginFail = <Dialog srcImg='/img/layout/fail.png' title='Lỗi kết nối' content='Server mất kết nối' handleAgree={hideDialog} handleCancer={hideDialog}/>;
            showDialog(dialogLoginFail);
            setLoading(false);
        });
    }

    return (
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