import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react'

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <Button colorScheme='teal' variant='outline' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      ログアウト
    </Button>
  );
};

export default LogoutButton;