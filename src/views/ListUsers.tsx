import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Image, Heading, Text, Code, Container, SimpleGrid } from '@chakra-ui/react';
import { withAuthenticationRequired } from "@auth0/auth0-react";

interface User {
    picture: string;
    name: string;
    email: string;
    [key: string]: any;
}

export const UserListComponent: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [token, setToken] = useState<string>("");

    const getToken = (() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        (async () => {
            try {
                const response = await fetch("https://jq37brbisg.execute-api.ap-northeast-1.amazonaws.com/deployment/translate", requestOptions);
                const result = await response.json();
                const new_token = result.body.access_token.toString();
                setToken(new_token);
            } catch (error) {
                console.log('error', error);
            }
        })();
    });

    const getUsers = async (token: string) => {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };

        try {
            const response = await fetch("https://dev-ahsivo00r84wgtro.jp.auth0.com/api/v2/users", requestOptions);
            const result = await response.json();
            setUsers(result);
        } catch (error) {
            console.log('error', error);
        }
    }

    // const deleteUser = async (id: string) => {
    //     const result = window.confirm('削除しますか');

    //     if (result) {
    //         console.log('削除');
    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", `Bearer ${token}`);

    //         const requestOptions = {
    //             method: 'DELETE',
    //             headers: myHeaders,
    //             redirect: 'follow'
    //         };

    //         try {
    //             await fetch(`https://dev-ahsivo00r84wgtro.jp.auth0.com/api/v2/users/${id}`, requestOptions);
    //             alert(`${id}は削除されました`);
    //             await getUsers(token);
    //         } catch (error) {
    //             console.log('error', error);
    //         }
    //     } else {
    //         console.log('削除をとりやめました');
    //     }
    // }

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        if (token !== "") {
            getUsers(token);
        }
    }, [token]);

    return (
        <Container maxW="container.xl" py={5}>
            <Heading as="h1" mb={5}>ユーザ一覧画面</Heading>
            {users?.map((user, index) => (
                <Box key={index} mb={10} p={5} boxShadow="md" borderWidth="1px" borderRadius="lg">
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
                        <Box>
                            <Image
                                src={user?.picture}
                                alt="Profile"
                                borderRadius="full"
                                boxSize="150px"
                                mb={5}
                            />
                        </Box>
                        <Box>
                            <Heading as="h2" size="lg">{user?.name}</Heading>
                            <Text fontSize="lg" color="gray.500">{user?.email}</Text>
                        </Box>
                    </SimpleGrid>
                    <Box mt={5}>
                        <Code p={3} display="block" whiteSpace="pre-wrap" textAlign="left">
                            {JSON.stringify(user, null, 2)}
                        </Code>
                    </Box>
                </Box>
            ))}
        </Container>
    );
};

export default withAuthenticationRequired(UserListComponent, {
    onRedirecting: () => <CircularProgress />,
});
