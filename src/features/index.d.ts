interface User{
    id: number,
    avatarUrl: string,
    lastName: string,
    firstName: string,
    birthDay: string,
    gender: boolean,
    phone: string,
    typing?: boolean
}

type MessageType = "Text" | "File";
type MessageStatus = "success" | "load";

interface Message{
    id: number,
    sender: User,
    content: string,
    typeMessage: MessageType,
    createAt: string,
    netId?: number,
    status?: MessageStatus
}

interface MessageFile extends Message{
    fileAttachUrl: string
    typeFile: string,
    src: string,
    loaded?: boolean
}

interface Conversation{
    id: number,
    title: string,
    creatorId: number,
    participants: User[],
    messages: Message[],
    amountMessageNotRead: number,
    scroll?: number
}