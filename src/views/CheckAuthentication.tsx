// src/Login.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { getConfig } from '../config/config';
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, Container } from "@chakra-ui/react";
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    [key: string]: any;
}

const CheckAuthentication: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const config = getConfig();
        const domain = config.domain
        const clientId = 'LcxNRzkbs5DI2VtdDIdpRxIdxLVbmbrb';
        const clientSecret = 'Q2TM6KUUNJ5883rixxa0TII97w5GT9lyRUc_ZG22MftZ-UKBvrlS0JeqM6RAr9ML';
        const audience = 'https://imatomotestaaa.jp.auth0.com/api/v2/';
        const scope = 'openid';
        try {
            const response = await axios.post(`https://${domain}/oauth/token`, {
                client_id: clientId,
                client_secret: clientSecret,
                audience: audience,
                grant_type: 'password',
                realm: "TOHOGASDB", //email or sms
                username: username,
                password: password,
                // connection: "TOHOGAS",
                scope: scope
            }, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            console.log(response);

            setToken(response.data.id_token);
            const decoded = jwtDecode(response.data.id_token);
            setDecodedToken(decoded);
        } catch (error: any) {
            console.error('Error logging in:', error.response);
        }
    };

    return (
        <Container maxW="container.lg" py={6}>
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
                    <>                    <Box mt={8} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                        <Heading as="h3" size="md">Token</Heading>
                        <Text mt={8}>{token}</Text>

                    </Box>

                        <Box mt={8} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                            <Heading as="h3" size="md">デコード結果</Heading>

                            <Text isTruncated align={'left'} mt={8}>
                                {decodedToken && (
                                    <p>{JSON.stringify(decodedToken, null, 2)}</p>
                                )}
                            </Text>
                        </Box>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default CheckAuthentication;
