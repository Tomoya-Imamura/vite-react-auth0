import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';

const MenuSelect = () => {
    const { logout } = useAuth0();
    return (
        <Menu>
            <MenuButton as={Button} leftIcon={<ChevronDownIcon />}>
                メニュー
            </MenuButton>
            <MenuList>
                <MenuItem as='a' href='/'>Home</MenuItem>
                <MenuItem as='a' href='/update'>パスワード変更</MenuItem>
                <MenuItem as='a' href='/listUsers'>ユーザリスト</MenuItem>
                <MenuItem as='a' href='/checkAuthentication'> 認証API</MenuItem>
                <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout</MenuItem>

            </MenuList>
        </Menu>
    )
}

export default MenuSelect;