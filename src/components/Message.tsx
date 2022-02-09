




type MessageType = {
  userId: number
  messageText: string,
  conversationId: number
  id: number
}


type Props = {
  message: MessageType
  outgoing: boolean
}


function Message({ message, outgoing }: Props) {
  return (
    <li className={outgoing ? 'outgoing' : 'incoming'}>
      <p>{message.messageText}</p>
    </li>
  )
}

export default Message
