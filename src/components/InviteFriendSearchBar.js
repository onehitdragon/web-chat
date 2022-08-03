import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchInviteKeyword } from "../features/search/searchSlice";

function InviteFriendSearchBar(){
    const searchInviteKeyword = useSelector(state => state.search.searchInviteKeyword);
    const dispatch = useDispatch();

    return (
        <div className="input-area__search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <div className="input">
                <input name="search-friend" placeholder="Thêm bạn vào nhóm..."
                    value={searchInviteKeyword}
                    onChange={(e) => { dispatch(updateSearchInviteKeyword(e.target.value)) }}/>
            </div>
            <p className="line"></p>
            <i></i>
        </div>
    );
}

export default memo(InviteFriendSearchBar);