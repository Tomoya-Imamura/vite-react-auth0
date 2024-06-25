import { useState } from 'react'
import '../App.css'
import LoginButton from '../component/LoginButton'
import LogoutButton from '../component/LogoutButton'
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react'
import { FC } from "react";

export const Home: FC = () => {
  const [count, setCount] = useState(0)
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <>


      <h1>Vite + React</h1>
      <div className="card">
        <Button colorScheme='teal' variant='outline' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      {isLoading && <div>読み込み中...</div>}
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <div>
          <LogoutButton />
          <h2>ユーザ名：{user?.name}</h2>
          <p>email:{user?.email}</p>
        </div>
      )}
    </>
  )
}
export default withAuthenticationRequired(Home, {
  onRedirecting: () => <div>Redirecting you to the login page...</div>
})
