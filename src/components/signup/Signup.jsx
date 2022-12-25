import React, { useEffect } from 'react';
import './signup.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { auth, provider } from '../../firebaseConfig';
import { Typography } from '@mui/material';

import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { useNavigate } from "react-router-dom";


const Signup = () => {

    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            localStorage.setItem('profilePic', profilePic);
        }).then(() => {
            navigate('/home');
        }).catch((error) => {
            console.log(error);
        });
    };

    const logOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem('name', '');
            localStorage.setItem('email', '');
            localStorage.setItem('profilePic', '');
            console.log('logout successfully');
        }).catch(() => {
            console.log('error');
        })
    }

    useEffect(() => {
        console.log('hello');
    }, []);

    return (
        <Box>
            <Button variant='contained' onClick={signInWithGoogle}>Sign up</Button>
            <Typography>{localStorage.getItem('name')}</Typography>
            <Typography>{localStorage.getItem('email')}</Typography>
            <Typography>{localStorage.getItem('profilePic')}</Typography>
        </Box>
    )
}

export default Signup