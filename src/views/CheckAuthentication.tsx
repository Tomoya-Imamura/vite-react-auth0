// src/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { getConfig } from '../config/config';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, Container } from "@chakra-ui/react";

const CheckAuthentication: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const config = getConfig();
        const domain = config.domain
        const clientId = "BrBEwKyWSThXDl0GOtc8gXE358co05pn";
        const clientSecret = "4_qmaslwjlax6SFdodyth5LKE0pR4pWoHSxOYaC4HFOygMJQd9V0SoLBdExYyTA0";


        try {
            const response = await axios.post(`https://${domain}/oauth/token`, {
                grant_type: 'password',
                username: username,
                password: password,
                scope: 'openid profile email',
                client_id: clientId,
                client_secret: clientSecret,
                audience: config.audience,
            });
            console.error(response);
            setToken(response.data.id_token);
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <Container maxW="md" py={5}>
            <Box boxShadow="md" p={6} rounded="md" bg="white">
                <Heading as="h2" size="lg" mb={6} textAlign="center">
                    Login
                </Heading>
                <form onSubmit={handleLogin}>
                    <VStack spacing={4}>
                        <FormControl id="username">
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="full">
                            Login
                        </Button>
                    </VStack>
                </form>
                {token && (
                    <Box mt={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                        <Heading as="h3" size="md">Token</Heading>
                        <Text mt={2}>{token}</Text>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default CheckAuthentication;
