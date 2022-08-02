import { memo } from "react";
import BaseFriend from "./BaseFriend";
import FriendMenu from "./FriendMenu";

function FriendQuestingByOther({friend}){
    return (
        <BaseFriend friend={friend}
            friendMenu={<FriendMenu rows={[
                {
                    title: "Chấp nhận",
                    handleOnClick(){
                        
                    }
                },
                {
                    title: "Từ chối",
                    handleOnClick(){
                        
                    }
                }
            ]}/>}/>
    );
}

export default memo(FriendQuestingByOther);