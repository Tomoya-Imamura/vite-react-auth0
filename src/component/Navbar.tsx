// src/components/Navbar.tsx
import React from 'react';
import { Box, Flex, HStack, CircularProgress } from '@chakra-ui/react';


import MenuSelect from './MenuSelect';
import LoginButton from './LoginButton';

import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>

        <HStack spacing={8} alignItems={'center'}>
          <Box>CIC検証アプリ</Box>

        </HStack>

        <Flex alignItems={'center'}>
          {isLoading ? <CircularProgress isIndeterminate color='green.300' /> :
            !isAuthenticated ? <LoginButton /> : <MenuSelect />}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
