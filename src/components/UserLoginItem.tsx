
type User = {
  firstName: string
  lastName: string
  phoneNumber: number
  avatar: string
  id: number
}

type LoginType = {
  User: string
}


type props = {
  login: LoginType
  user: User
}

function UserLoginItem({ user, logIn }: props) {
  return (
    <li>
      <button
        className='user-selection'
        onClick={() => {
          logIn(user)
        }}
      >
        <img
          className='avatar'
          width='50'
          height='50'
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <h3>
          {user.firstName} {user.lastName}
        </h3>
      </button>
    </li>
  )
}

export default UserLoginItem
