import { GetServerSideProps } from "next";
import Home from "../../components/Home";
import { useRouter } from "next/router";
import { useEffect } from "react";
import doRequestApi from "@/tools/doRequestApi";
import { useDispatch } from "react-redux";
import { loadedYou } from "@/features/chat/youSlice";
import { loadedConversations } from "@/features/chat/conversationsSlice";
import { loadedFriends, loadedQuestingByOthers, loadedQuestingByYous } from "@/features/friend/friendsSlice";

interface HomePageProps{
    login: boolean,
    userData: UserData | null
}

export default function({ login, userData }: HomePageProps){
    const router = useRouter();
    const dispatch = useDispatch();
    if(userData !== null){
        dispatch(loadedYou(userData.you));
        dispatch(loadedConversations(userData.listConversation));
        dispatch(loadedFriends(userData.listFriending));
        dispatch(loadedQuestingByOthers(userData.listQuestingByOther));
        dispatch(loadedQuestingByYous(userData.listQuestingByYou));
    }

    useEffect(() => {
        if(!login){
            router.push("/");
        }
    }, [])

    return (
        login &&
        <Home />
    );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req }) => {
    const cookie = req.headers.cookie;
    const loginData = await doRequestApi<{logined: boolean}>(
        "/account/CheckLogined", "GET", { cookie }
    )
    let userData: UserData | null = null;

    if(loginData.logined){
        userData = await doRequestApi<UserData>('/home/index', 'GET', { cookie });
        console.log(userData);
    }

    return {
        props: {
            login: loginData.logined,
            userData
        }
    }
}