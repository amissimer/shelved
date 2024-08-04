"use client";
import React, { useState } from 'react';
import { Box, Stack, TextField, Button, Typography } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter} from 'next/navigation';

export default function ForgotPassword (){
  const [email, setEmail] = useState('');
  const router = useRouter();
  const resetEmail = () => {
    sendPasswordResetEmail(auth, email)
    router.push('/signin')
  }

  return (
    <Box width={'100vw'} height={'100vh'} display={'flex'}
    justifyContent={'center'} alignItems={'center'} gap={2}
    flexDirection={'column'} bgcolor="#29353C"
    >
      <Stack marginTop={-30} spacing={2}>
        <Typography variant="h4" color={'#E6E6E6'} fontFamily= 'Gill Sans'
        >Forgot Password
        </Typography>
        <TextField variant="outlined"
        fontFamily= 'Gill Sans'
        type='text'
        placeholder='Email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        >

        </TextField>
        <Button 
        onClick={() => resetEmail()
        }
        disabled={!email}
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
          Reset Password
        </Button>
      </Stack>
      <Box>
        <Typography onClick={() => router.push('/signup')}
         sx={{
          color: '#E6E6E6',
          fontFamily: 'Gill Sans',
          '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
          }
        }}
        
        >
          Don&apos;t have an account? Sign Up
        </Typography>
      </Box>
    </Box>
  
  );


}