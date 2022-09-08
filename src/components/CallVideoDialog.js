import { memo } from "react";
import { useSelector } from "react-redux";

function CallVideoDialog(){
    const callVieoDialog = useSelector(state => state.mainMenu.callVieoDialog);

    return (
        callVieoDialog.show &&
        <div className='wrapper'>
            <div className="dialog">
                <div className='info-area'>
                    <img className='avatar' alt='error' src={callVieoDialog.friend.avatarUrl}/>
                    <p className='name'>{callVieoDialog.friend.lastName + " " + callVieoDialog.friend.firstName}</p>
                    <p className='status'>{callVieoDialog.status}</p>
                </div>
                <div className='button-area'>
                    {callVieoDialog.buttons}
                </div>
            </div>
        </div>
    );
}

export default memo(CallVideoDialog);