import "../index.css";
import "../App.css";
import store from "@/app/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../lib/icon/fontawesome-free-6.0.0-web/css/all.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <div className="App">
                <Component {...pageProps}/>
            </div>
        </Provider>
    );
}