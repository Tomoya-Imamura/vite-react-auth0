import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { FC } from "react";
import { getConfig } from '../config/config'
import axios from 'axios';
import { CircularProgress, Button, Card, Grid, Heading, Text, Image, Stack, CardBody, CardFooter, GridItem } from '@chakra-ui/react';
import PasswordInput from '../component/PasswordInput';

export const UpdateUser: FC = () => {
  const config = getConfig();
  const { user } = useAuth0();
  const [token, setToken] = useState("");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const getToken = (() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    (async () => {
      await fetch("https://jq37brbisg.execute-api.ap-northeast-1.amazonaws.com/deployment/translate", requestOptions)
        .then(response => response.json().then((result) => {
          const new_token = (result.body.access_token.toString());
          setToken(new_token);
        }))
        .catch(error => console.log('error', error))
    })()
  })

  const changePassword = async () => {
    await axios.post(
      `https://${config.domain}/dbconnections/change_password`,
      {
        client_id: config.clientId,
        email: user?.email,
        connection: config.db,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    alert(user?.email + "にパスワード変更メールを送信しました。");
  };


  const handlePasswordChange = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setLoading(false);
      return;
    }
    const url = `https://${config.domain}/api/v2/users/${user?.sub}`;

    const data = {
      password: newPassword,
      connection: config.db
    };

    try {
      const response = await axios.patch(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setMessage('Password updated successfully.');
      console.log('Password updated successfully:', response.data);
      setLoading(false);
    } catch (error: any) {
      setMessage(error.response.data.message.toString());
      console.error(error.response.data.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    getToken();
  }, []);


  return (
    loading && !user ? <CircularProgress size='xl' isIndeterminate color=' green.300' /> :
      < div className="mb-5" >
        <h1>プロフィール画面</h1>

        <Grid
          h='200px'
          templateRows='repeat(2, 1fr)'
          templateColumns='repeat(12, 1fr)'
          gap={4}
        >

          <GridItem rowSpan={4} colSpan={4}>

            <h1>メールでパスワードを変更するフロー</h1>
            {!loading ?
              <Button onClick={() => changePassword()}>Change Password Mail
              </Button> :
              <Button
                isLoading
                loadingText='Loading'
                colorScheme='teal'
                variant='outline'
                spinnerPlacement='start'

              >
                Submit
              </Button>
            }

          </GridItem>
          <GridItem colSpan={4}>
            <Card
              direction={{ base: 'column', sm: 'row' }}
              overflow='hidden'
              variant='outline'
            >
              <Image
                objectFit='cover'
                maxW={{ base: '100%', sm: '200px' }}
                src={user?.picture}
                alt='Caffe Latte'
              />

              <Stack>
                <CardBody>
                  <Heading size='md'>{user?.email}</Heading>

                  <Text py='2'>
                    {user?.name}
                  </Text>
                </CardBody>

                <CardFooter>

                </CardFooter>
              </Stack>
            </Card>


            <div>
              <h1>Change Password</h1>
              <form onSubmit={handlePasswordChange}>
                <div>
                  <label>
                    New Password:
                    <PasswordInput password={newPassword} setPassword={setNewPassword} />
                  </label>
                </div>
                <div>
                  <label>
                    Confirm Password:
                    <PasswordInput password={confirmPassword} setPassword={setConfirmPassword} />
                  </label>
                </div>
                {!loading ?
                  <Button colorScheme='teal' variant='solid' type='submit'>
                    Button
                  </Button> :
                  <Button
                    isLoading
                    loadingText='Loading'
                    colorScheme='teal'
                    variant='outline'
                    spinnerPlacement='start'

                  >
                    Submit
                  </Button>
                }
              </form>

              {message && <Heading>{message}</Heading>}


            </div>
          </GridItem>
        </Grid>

      </div >

  );
}
