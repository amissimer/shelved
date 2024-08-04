"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import { auth } from '@/firebase';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';

export default function SignIn (){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [signInUserWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const onSubmit = async () => {
    await signInUserWithEmailAndPassword(email, password);
    router.push('/');
  }

  return (
    <Box width={'100vw'} height={'100vh'} display={'flex'}
    justifyContent={'center'} alignItems={'center'} gap={2}
    flexDirection={'column'} bgcolor="#29353C"
    >
      <Stack marginTop={-30} spacing={2}>
        <Typography variant="h4"
        color="#E6E6E6"
        fontWeight={500}
        fontFamily= 'Gill Sans'
        >Sign in to Pantry Tracker 
        </Typography>
        <TextField variant="outlined"
        type='text'
        fontFamily= 'Gill Sans'
        placeholder='Email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        >

        </TextField>
        <TextField variant="outlined"
        fontFamily= 'Gill Sans'
        type='password'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        >
          
        </TextField>
        <Button 
        onClick={() => onSubmit()}
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
          Sign In
        </Button>
      </Stack>
      <Box >
        <Typography
        onClick={() => router.push('/forgot-password')}
        color="#E6E6E6"
        fontFamily= 'Gill Sans'
        sx={{
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
          }
        }}
        >
          Forgot Password?
        </Typography>
        <Typography onClick={() => router.push('/signup')}
        color="#E6E6E6"
        fontFamily= 'Gill Sans'
        sx={{
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
          }
        }}
        >
          Don&apos;t have an account? <span color="#44576D">Sign Up</span>
        </Typography>
      </Box>
    </Box>

  
  );


}