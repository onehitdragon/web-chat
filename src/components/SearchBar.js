import { memo } from "react";
import { useDispatch } from "react-redux";
import { updateConversationKeyword } from "../features/search/searchSlice";

function SearchBar(){
    const dispatch = useDispatch();

    return (
        <div className="body-left__search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Nhập nội dung tìm kiếm..."
                onChange={(e) => { dispatch(updateConversationKeyword(e.target.value)); }}/>
            <p className="line"></p>
        </div>
    );
}

export default memo(SearchBar);