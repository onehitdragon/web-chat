function isMessageFile(message: Message): message is MessageFile{
    return message.typeMessage === "File";
}

export { isMessageFile }