import { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateConversationKeyword } from "../features/search/searchSlice";

function SearchBar(){
    const keyword = useSelector(state => state.search.conversationKeyword);
    const dispatch = useDispatch();

    return (
        <div className="body-left__search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Nhập nội dung tìm kiếm..." value={keyword}
                onChange={(e) => { dispatch(updateConversationKeyword(e.target.value)); }}/>
            <p className="line"></p>
        </div>
    );
}

export default memo(SearchBar);