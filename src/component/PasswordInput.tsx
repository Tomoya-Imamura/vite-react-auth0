import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useState } from 'react'
import React, { ChangeEvent } from 'react';

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ password, setPassword }) => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    return (
        <InputGroup size='md'>
            <Input
                value={password}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                onChange={handlePasswordChange}
            />
            <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}


export default PasswordInput;