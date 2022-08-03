import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateShowCreationMain } from "../features/menu/mainMenuSlice";
import FriendInvites from "./FriendInvites";
import GroupNameInput from "./GroupNameInput";
import InviteFriendSearchBar from "./InviteFriendSearchBar";
import { reset } from "../features/CreateGroup/createGroupSlice";

function GroupCreationMain() {
    const friends = useSelector(state => state.friends.friends);
    const nameGroup = useSelector(state => state.createGroup.nameGroup);
    const invites = useSelector(state => state.createGroup.invites);
    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch(reset());
        }
    }, []);

    return (
        <div id="friend-search-area">
            <div className="friend-search-main">
                <div className="title">
                    <span>Tạo nhóm</span>
                    <button name="close-friend-search" onClick={() => { dispatch(updateShowCreationMain(false)) }}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="input-area">
                    <GroupNameInput />
                    <InviteFriendSearchBar />
                </div>
                <div className="creation-group-area">
                    <FriendInvites friends={friends}/>
                </div>
                <div className="area-button">
                    {
                        invites.length >= 2 && nameGroup !== "" &&
                        <button name="create-group-button">Xác nhận</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default memo(GroupCreationMain)