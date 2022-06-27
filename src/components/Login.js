import './Login.css';
import {useState} from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
            return res.json();
        })
        .then((data) => {
            setLoading(false);
        })
        .catch((e) => {
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