import styles from './Login.module.css';
import {useEffect, useState} from 'react';
import Dialog from './Dialog';
import { useDispatch } from "react-redux";
import { checkStatus, login, loginFacebook, loginGoogle } from '../features/chat/youSlice';
import { FE_DEV_URL } from '../tools/doRequestApi';
import { useRouter } from 'next/router';

interface LoginProps{
    showDialog: (dialogNeedShow: React.ReactNode) => any,
    hideDialog: Function
}

function Login({showDialog, hideDialog}: LoginProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const loginGoogleHandle = () => {
        window.open("https://accounts.google.com/o/oauth2/v2/auth?"
        +"scope=https%3A//www.googleapis.com/auth/drive.metadata.readonly&"
        +"response_type=token&"
        +`redirect_uri=${FE_DEV_URL}&`
        +"client_id=493170822018-t5jhkkr1aqo6o7svs0j1gfg03ipfir6e.apps.googleusercontent.com&"
        +"state=loginGoogle"
        , "_top");
    }

    const loginFacebookHandle = () => {
        window.open("https://www.facebook.com/v15.0/dialog/oauth?"
        +"client_id=435845621984441&"
        +`redirect_uri=${FE_DEV_URL}&`
        +"state=loginFacebook&"
        +"response_type=token",
        "_top");
    }

    useEffect(() => {
        // check google login
        if(window.location.hash?.includes("state=loginGoogle")){
            const access_token = window.location.hash.split('&')[1];
            fetch(`https://www.googleapis.com/drive/v3/about?fields=user&${access_token}`, { method: "GET" })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.user){
                    dispatch<any>(loginGoogle(
                        data.user.emailAddress,
                        data.user.displayName,
                        data.user.photoLink,
                        (res) => {
                            res.then(() => {
                                router.push("/home");
                            })
                        }
                    ));
                }
            })
            return;
        }

        // check login facebook
        if(window.location.hash?.includes("state=loginFacebook")){
            const access_token = window.location.hash.split('#')[1].split("&")[0];
            fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&${access_token}`, { method: "GET" })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.id){
                    dispatch<any>(loginFacebook(
                        data.id,
                        data.name,
                        data.picture.data.url.replaceAll("&", "#"),
                        (res) => {
                            res.then(() => {
                                router.push("/home");
                            })
                        }
                    ));
                }
            })
            return;
        }

        const navigateToHome = () => {
            router.push("/home");
        };
        const showLoginPage = () => {
            
        };
        dispatch<any>(checkStatus(navigateToHome, showLoginPage));

        // eslint-disable-next-line
    }, []);

    const handleLoginButtonClick = () => {
        setLoading(true);
        const processResponse: Parameters<typeof login>[2] = (res) => {
            let dialog: React.ReactElement;
            res.then((data) => {
                console.log(data);
                if("errorConnection" in data && data.errorConnection){
                    dialog = <Dialog srcImg='/img/layout/fail.png' title='Lỗi kết nối' content='Server mất kết nối' handleAgree={hideDialog} handleCancer={hideDialog}/>;
                }
                else if("isSuccess" in data && data.isSuccess){
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
        dispatch<any>(login(email, password, processResponse));
    }

    const handleLoginSuccess = () => {
        router.push("/home");
        hideDialog();
    }

    return (
        <div className={styles["body"]}>
            <div className={styles["body__main"]}>
                <p className={styles["title"]}>Đăng Nhập</p>
                <p className={styles["title-2"]}>Đăng nhập với</p>
                <div className={styles["other-login"]}>
                    <div onClick={ loginFacebookHandle }>
                        <i className={styles["fa-brands fa-facebook-f"]}></i>
                        <a href="/" onClick={(e) => { e.preventDefault() }}>Facebook</a>
                    </div>
                    <div onClick={ loginGoogleHandle }>
                        <i className={styles["fa-brands fa-google"]}></i>
                        <a href="/" onClick={(e) => { e.preventDefault() }}>Google</a>
                    </div>
                </div>
                <p className={styles["title-2"]}>Hoặc sử dụng tài khoản của bạn</p>
                <form className={styles["login-form"]}>
                    <div className={styles["login-form__row"] + " " + styles["login-form__row--normal"]}>
                        <input className={styles["input"]} name="Email" value={ email } onChange={(e) => { setEmail(e.target.value); }} type="text" placeholder="Email" />
                    </div>
                    <div className={styles["login-form__row"] + " " + styles["login-form__row--normal"]}>
                        <input className={styles["input"]} name="Password" value={ password } onChange={(e) => { setPassword(e.target.value); }} type="password" placeholder="Mật khẩu" />
                    </div>
                    <div className={styles["login-form__row"] + " " + styles["login-form__row--custom"]}>
                        <div>
                            <input className={styles["input"]} name="SavePassword" type="checkbox"/> Nhớ mật khẩu
                        </div>
                        <div>
                            <a href="/">Quên mật khẩu</a>
                        </div>
                    </div>
                    <img style={{display: loading ? 'block' : 'none'}} className={styles["loading"]} src="/img/gif/loader.gif" alt="error"/>
                    {!loading && <button type="button" name="login" onClick={handleLoginButtonClick}>Đăng nhập</button>}
                    <button type="button" name="register">Đăng ký</button>
                </form>
            </div>
        </div>
    );
}

export default Login as React.FunctionComponent<LoginProps>;