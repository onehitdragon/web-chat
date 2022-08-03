import { memo } from "react";
import { useDispatch } from "react-redux";
import { updateNameGroup } from "../features/CreateGroup/createGroupSlice";

function GroupNameInput(){
    const dispatch = useDispatch();

    return (
        <div className="input-area__search" style={{ marginBottom: "10px" }}>
            <i></i>
            <div className="input">
                <input name="name-group" placeholder="Nhập tên nhóm..." autoFocus
                    onChange={(e) => { dispatch(updateNameGroup(e.target.value))} }/>
            </div>
            <div className="list-search"></div>
            <i></i>
        </div>
    );
}

export default memo(GroupNameInput);