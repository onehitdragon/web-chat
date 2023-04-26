import "../index.css";
import "../App.css";
import store from "@/app/store";
import { AppProps } from "next/app";
import { Provider } from "react-redux";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <div className="App">
                <Component {...pageProps}/>
            </div>
        </Provider>
    );
}