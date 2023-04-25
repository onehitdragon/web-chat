import "../index.css";
import "../App.css";
import store from "@/app/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="App">
            <Provider store={store}>
                <Component {...pageProps}/>
            </Provider>
        </div>
    );
}