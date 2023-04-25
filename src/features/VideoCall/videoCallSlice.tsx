import { ThunkAction, ThunkDispatch, createSlice } from "@reduxjs/toolkit";
import CallVideoDialogButtonAgree from "../../components/CallVideoDialogButtonAgree";
import CallVideoDialogButtonDeny from "../../components/CallVideoDialogButtonDeny";
import { updateStatusCallVieoDialog, updateCallVieoDialog, hideCallVideoDialog, updateShowCallVideoMain, removeButtonCallVideoDialog } from "../menu/mainMenuSlice";
import { RootState } from "../../app/store";

const configure = {
    iceServers: [
        {
            urls: 'stun:stun.l.google.com:19302'
        },
        {
            urls: "turn:openrelay.metered.ca:80",
            username: "openrelayproject",
            credential: "openrelayproject"
        },
        {
          urls: "turn:openrelay.metered.ca:443",
          username: "openrelayproject",
          credential: "openrelayproject",
        },
        {
          urls: "turn:openrelay.metered.ca:443?transport=tcp",
          username: "openrelayproject",
          credential: "openrelayproject",
        }
    ]
}
let candidates: any[] = [];
const addAllCandidates = (peer: any) => {
    candidates.forEach((candidate) => {
        peer.addIceCandidate(candidate);
    });
    candidates = [];
}

interface VideoCallState{
    connection: RTCPeerConnection | null,
    stream: MediaStream | null,
    remoteStream: MediaStream | null,
    friend: User | null,
}

const init: VideoCallState = {
    connection: null,
    stream: null,
    remoteStream: null,
    friend: null
}

const videoCallSlice = createSlice({
    name: "videoCall",
    initialState: init,
    reducers: {
        updateConnection(state, action: { payload: RTCPeerConnection }){
            state.connection = action.payload;
        },
        updateStream(state, action: { payload: MediaStream }){
            state.stream = action.payload;
            if(action.payload){
                action.payload.getTracks().forEach((track) => {
                    if(state.connection !== null){
                        state.connection.addTrack(track, action.payload);
                    }
                });
            }
        },
        updateRemoteStream(state, action: { payload: MediaStream }){
            state.remoteStream = action.payload;
        },
        updateFriend(state, action: { payload: User }){
            state.friend = action.payload;
        }
    }
});

export default videoCallSlice.reducer;
const {updateConnection, updateStream, updateRemoteStream, updateFriend} = videoCallSlice.actions;

const getStream = async () => {
    const mediaConstrain = {
        audio: true,
        video: {
            "width": 1280,
            "height": 720
        }
    }
    return await navigator.mediaDevices.getUserMedia(mediaConstrain).catch((err) => { throw Error(err) });
}

// function action
const buildConnection: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
    const peer = new RTCPeerConnection(configure);
    peer.addEventListener("connectionstatechange", () => {
        console.log("vinh: " + peer.connectionState);
    });
    peer.addEventListener("icegatheringstatechange", () => {
        console.log(peer.iceGatheringState);
    })
    peer.addEventListener("track", (e) => {
        dispatch(updateRemoteStream(e.streams[0]));
    });
    dispatch(updateConnection(peer));
    signaling(peer, dispatch, getState);
}

const signaling = (peer: RTCPeerConnection, dispatch: ThunkDispatch<RootState, any, any>, getState: () => RootState) => {
    const socket = getState().socket;
    if(socket === null) return;
    
    socket.on("callVideo", (reply, friend, offer) => {
        if(reply === "offline"){
            dispatch(updateStatusCallVieoDialog("Người này không trực tuyến..."));
        }
        if(reply === "beCall"){
            const onAccept = () => {
                dispatch(acceptCallVideo(friend, offer));
            }
            const onDeny = () => {
                dispatch(denyCallVideo(friend));
                dispatch(hideCallVideoDialog());
            }
            dispatch(updateCallVieoDialog({
                show: true,
                friend: friend,
                status: "Đang gọi...",
                buttons: [
                    <CallVideoDialogButtonAgree key={1} onHandleClick={onAccept}/>,
                    <CallVideoDialogButtonDeny key={2} onHandleClick={onDeny}/>
                ]
            }));
        }
    });

    socket.on("acceptCallVideo", async (reply, friend, answer) => {
        if(reply === "offline"){
            dispatch(updateStatusCallVieoDialog("Người gọi không trực tuyến..."));
        }
        if(reply === "online"){
            dispatch(updateShowCallVideoMain(true));
            dispatch(hideCallVideoDialog());
        }
        if(reply === "beAnswer"){
            await peer.setRemoteDescription(answer);
            addAllCandidates(peer);
            dispatch(updateShowCallVideoMain(true));
            dispatch(hideCallVideoDialog());
        }
    })

    peer.addEventListener("icecandidate", (e) => {
        if(e.candidate){
            socket.invoke("Candidate", getState().videoCall.friend, e.candidate)
        }
    });

    socket.on("candidate", (candidate) => {
        const connection = getState().videoCall.connection;
        if(connection === null) return;
        if(peer.currentRemoteDescription){
            connection.addIceCandidate(candidate);
        }
        else{
            candidates.push(candidate);
        }
    })

    socket.on("cancerCallVideo", (friend) => {
        dispatch(removeButtonCallVideoDialog(0));
        dispatch(updateStatusCallVieoDialog("Người gọi đã ngắt..."));
    })

    socket.on("denyCallVideo", (friend) => {
        dispatch(updateStatusCallVieoDialog("Người gọi đã từ chối..."));
    })
}

const callVideo = (friend: User) => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const socket = getState().socket;
        if(socket === null) return;
        const connection = getState().videoCall.connection;
        if(connection === null) return;

        const onCancer = () => {
            socket.invoke("CancerCallVideo", friend);
            dispatch(hideCallVideoDialog());
        }
        dispatch(updateCallVieoDialog({
            show: true,
            friend: friend,
            status: "Đang gọi...",
            buttons: [
                <CallVideoDialogButtonDeny key={1}
                    onHandleClick={onCancer}/>
            ]
        }));
        dispatch(updateFriend(friend));
        dispatch(updateStream(await getStream()));
        const offer = await connection.createOffer();
        await connection.setLocalDescription(offer);
        socket.invoke("CallVideo", friend, offer);
    }

    return thunk;
}

const acceptCallVideo = (friend: User, offer: RTCSessionDescription) => {
    const thunk: ThunkAction<void, RootState, any, any> = async (dispatch, getState) => {
        const connection = getState().videoCall.connection;
        if(connection === null) return;
        await connection.setRemoteDescription(offer);
        const socket = getState().socket;
        if(socket === null) return;

        dispatch(updateFriend(friend));
        dispatch(updateStream(await getStream()));
        const answer = await connection.createAnswer();  
        await connection.setLocalDescription(answer);
        addAllCandidates(connection);
        socket.invoke("AcceptCallVideo", friend, answer);
    }

    return thunk;
}

const denyCallVideo = (friend: User) => {
    const thunk: ThunkAction<void, RootState, any, any> = (dispatch, getState) => {
        const socket = getState().socket;
        if(socket === null) return;

        socket.invoke("DenyCallVideo", friend);
        candidates = [];
    }

    return thunk;
}

export { callVideo, buildConnection }