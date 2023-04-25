function isMessageFile(message: Message): message is MessageFile{
    return message.typeMessage === "File" || message.typeMessage === 1;
}

export { isMessageFile }