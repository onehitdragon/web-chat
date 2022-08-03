import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleInvite } from "../features/CreateGroup/createGroupSlice";

function FriendInvite({friend}){
    const name = friend.lastName + " " + friend.firstName;
    const keyword = useSelector(state => state.search.searchInviteKeyword);
    const show = name.toLowerCase().includes(keyword.toLowerCase());
    const dispatch = useDispatch();
    const [choice, setChoice] = useState(false);

    return (
        show &&
        <div className={`list-added__item ${choice ? "list-added__item--choice" : ""}`}
            onClick={() => { dispatch(toggleInvite(friend)); setChoice(!choice) }}>
            <img className="avatar" src={friend.avatarUrl} alt="error"/>
            <span>{name}</span>
            {
                choice &&
                <img className="choice" src="https://marketplace.canva.com/5EAds/MAEmCa5EAds/2/tl/canva-yellow-encircle-icon-MAEmCa5EAds.png" alt="error" />
            }
        </div>
    );
}

export default memo(FriendInvite);