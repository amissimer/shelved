"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase';

export default function signup (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();
  const [createUser] = useCreateUserWithEmailAndPassword(auth);
  const [sendEmailVerification] = useSendEmailVerification(auth);

  const signup = async () => {
    await createUser(email, password)
    await sendEmailVerification();
    router.push('/signin');
  }

  return (
    <Box width={'100vw'} height={'100vh'} display={'flex'}
    justifyContent={'center'} alignItems={'center'} gap={2}
    flexDirection={'column'} bgcolor="#29353C"
    >
      <Stack marginTop={-30} spacing={2}>
        <Typography variant="h4" color="#E6E6E6"
        fontFamily= 'Gill Sans'
        >Sign Up 
        </Typography>
        <TextField variant="outlined"
        type='text'
        placeholder='Email'
        fontFamily= 'Gill Sans'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        >

        </TextField>
        <TextField variant="outlined"
        type='password'
        placeholder='Password'
        fontFamily= 'Gill Sans'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        >
          
        </TextField>
        <TextField variant="outlined"
        type='password'
        placeholder='Confirm Password'
        fontFamily= 'Gill Sans'
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        required
        >
          
        </TextField>
        <Button 
        onClick={() => signup()}
        disabled={!email || !password}
        variant={'contained'}
        sx={{
          bgcolor: "#AAC7D8", 
          color: 'white',
          fontFamily: 'Gill Sans',
            '&:hover': {
                    bgcolor: '#98bed4',
                  }
          }}
        >
          Sign Up
        </Button>
      </Stack>
      <Box >
        <Typography
        onClick={() => router.push('/forgot-password')}
        color="#E6E6E6" fontFamily= 'Gill Sans'
        sx={{
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
          }
        }}
        >
          Forgot Password?
        </Typography>
        <Typography onClick={() => router.push('/signin')}
        color="#E6E6E6" fontFamily= 'Gill Sans'
        sx={{
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
          }
        }}
        >
          Have an account? Sign In
        </Typography>
      </Box>
    </Box>
  
  );


}