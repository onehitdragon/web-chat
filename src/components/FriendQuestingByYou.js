import { memo } from "react";
import BaseFriend from "./BaseFriend";
import FriendMenu from "./FriendMenu";

function FriendQuestingByYou({friend}){
    return (
        <BaseFriend friend={friend}
            friendMenu={<FriendMenu rows={[
                {
                    title: "Huỷ gửi",
                    handleOnClick(){
                        
                    }
                }
            ]}/>}/>
    );
}

export default memo(FriendQuestingByYou);