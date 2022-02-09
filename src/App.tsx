import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

import Login from './pages/Login'
import Main from './pages/Main'
import NotFound from './pages/NotFound'



export type Usertype = {
  firstName: string
  lastName: string
  phoneNumber: number
  avatar: string
  id: number
}

export default function App() {


  const [currentUser, setCurrentUser] = useState<Usertype | null>(null)
  const [modal, setModal] = useState('')
  const [users, setUsers] = useState<Usertype[]>([])

  useEffect(() => {
    fetch('http://localhost:4000/users')
      .then(resp => resp.json())
      .then(users => setUsers(users))
  }, [])

  const navigate = useNavigate()

  function logIn(user: Usertype): void {
    // set user in state as the current user
    setCurrentUser(user)
    // navigate to the main page
    navigate('/logged-in')
  }

  function logOut(): void {
    setCurrentUser(null)
  }

  return (
    <div className="app">
      <Routes>
        <Route index element={<Navigate replace to="/login" />} />
        <Route
          path="/login"
          element={<Login setModal={setModal} logIn={logIn} users={users} />}
        />
        <Route
          path="/logged-in"
          element={
            <Main
              currentUser={currentUser}
              logOut={logOut}
              users={users}
              setModal={setModal}
              modal={modal}
            />
          }
        />
        <Route
          path="/logged-in/:conversationId"
          element={
            <Main
              modal={modal}
              currentUser={currentUser}
              logOut={logOut}
              users={users}
              setModal={setModal}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
