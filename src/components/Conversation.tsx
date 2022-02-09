import { Key, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from './Message'

type Usertype = {
  firstName: string
  lastName: string
  phoneNumber: number
  avatar: string
  id: number
}


type props = {
  currentUser: Usertype
}


type Messages = {
  userId: number
  messageText: string,
  conversationId: number
  id: number
}

type ConversationType = {
  userId: number
  participantId: number,
  id: number
  messages: Messages[]
}


type FormType = HTMLFormElement & {
  // text: HTMLInputElement
  reset: () => void
}

function Conversation({ currentUser }: props) {
  const [currentConversation, setCurrentConversation] = useState<ConversationType | null>(null)

  const params = useParams()

  function createMessage(text: Messages): void {
    // create a message on the server ✅

    fetch('http://localhost:4000/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: currentUser.id,
        messageText: text,
        conversationId: Number(params.conversationId)
      })
    })
      .then(resp => resp.json())
      .then(newMessage => {
        const currentConversationCopy = JSON.parse(
          JSON.stringify(currentConversation)
        )
        currentConversationCopy.messages.push(newMessage)
        setCurrentConversation(currentConversationCopy)
      })

    // update the conversation state
  }

  useEffect(() => {
    if (params.conversationId) {
      fetch(
        `http://localhost:4000/conversations/${params.conversationId}?_embed=messages`
      )
        .then(resp => resp.json())
        .then(conversation => setCurrentConversation(conversation))
    }
  }, [params.conversationId])

  if (currentConversation === null) return <h1>Loading...</h1>

  return (
    <main className='conversation'>
      {/* <!-- Chat header --> */}
      <header className='panel'></header>

      <ul className='conversation__messages'>
        {currentConversation.messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            outgoing={message.userId === currentUser.id}
          />
        ))}
      </ul>

      {/* <!-- Message Box --> */}
      <footer>
        <form
          className='panel conversation__message-box'
          onSubmit={(e: React.SyntheticEvent) => {
            const formEl = e.target as FormType;
            e.preventDefault();
            createMessage(formEl.text.value);
            formEl.text.value = ''
          }}
        >
          <input
            type='text'
            placeholder='Type a message'
            name='text'
            required
            autoComplete='off'
          />
          <button type='submit'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path
                fill='currentColor'
                d='M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z'
              ></path>
            </svg>
          </button>
        </form>
      </footer>
    </main>
  )
}

export default Conversation
