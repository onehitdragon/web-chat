import { createSlice } from "@reduxjs/toolkit";
import CallVideoDialogButtonAgree from "../../components/CallVideoDialogButtonAgree";
import CallVideoDialogButtonDeny from "../../components/CallVideoDialogButtonDeny";
import { updateStatusCallVieoDialog, updateCallVieoDialog, hideCallVideoDialog, updateShowCallVideoMain } from "../menu/mainMenuSlice";

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
let candidates = [];
const addAllCandidates = (peer) => {
    candidates.forEach((candidate) => {
        peer.addIceCandidate(candidate);
    });
    candidates = [];
}

const videoCallSlice = createSlice({
    name: "videoCall",
    initialState: {
        connection: null,
        stream: null,
        remoteStream: null,
        friend: null
    },
    reducers: {
        updateConnection(state, action){
            state.connection = action.payload;
        },
        updateStream(state, action){
            state.stream = action.payload;
            if(action.payload){
                action.payload.getTracks().forEach((track) => {
                    state.connection.addTrack(track, action.payload);
                });
            }
        },
        updateRemoteStream(state, action){
            state.remoteStream = action.payload;
        },
        updateFriend(state, action){
            state.friend = action.payload;
        }
    }
});

export default videoCallSlice.reducer;
export const { addTracks } = videoCallSlice.actions;
const {updateConnection, updateStream, updateRemoteStream, updateFriend} = videoCallSlice.actions;

const getStream = async () => {
    const mediaConstrain = {
        audio: true,
        video: true,
    }
    return await navigator.mediaDevices.getUserMedia(mediaConstrain).catch(() => {});
}

// function action
const buildConnection = (dispatch, getState) => {
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

const signaling = (peer, dispatch, getState) => {
    const socket = getState().socket;
    socket.on("callVideo", (reply, friend, offer) => {
        if(reply === "offline"){
            dispatch(updateStatusCallVieoDialog("Người này không trực tuyến..."));
        }
        if(reply === "beCall"){
            const onAccept = () => {
                dispatch(acceptCallVideo(friend, offer));
            }
            const onDeny = () => {
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
        if(peer.currentRemoteDescription){
            getState().videoCall.connection.addIceCandidate(candidate);
        }
        else{
            candidates.push(candidate);
        }
    })
}

const callVideo = (friend) => {
    return async (dispatch, getState) => {
        const connection = getState().videoCall.connection;

        dispatch(updateFriend(friend));
        dispatch(updateStream(await getStream()));
        const offer = await connection.createOffer();
        await connection.setLocalDescription(offer);
        getState().socket.invoke("CallVideo", friend, offer);
    }
}

const acceptCallVideo = (friend, offer) => {
    return async (dispatch, getState) => {
        const connection = getState().videoCall.connection;
        await connection.setRemoteDescription(offer);

        dispatch(updateFriend(friend));
        dispatch(updateStream(await getStream()));
        const answer = await connection.createAnswer();  
        await connection.setLocalDescription(answer);
        addAllCandidates(connection);
        getState().socket.invoke("AcceptCallVideo", friend, answer);
    }
}

export { callVideo, acceptCallVideo, buildConnection }