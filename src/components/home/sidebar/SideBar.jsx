import { Avatar, Box, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import './sidebar.css';

import { Link } from 'react-router-dom';

import { Sidebar, sidebarClasses, SubMenu, Menu, menuClasses, MenuItem } from 'react-pro-sidebar';

import { db, auth } from '../../../firebaseConfig';

import { signOut } from 'firebase/auth';

import { useNavigate } from "react-router-dom";

import { collection, addDoc, setDoc, doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteField, deleteDoc, getDocs } from '@firebase/firestore';

const SideBar = () => {

    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth).then(() => {
            localStorage.setItem('name', '');
            localStorage.setItem('email', '');
            localStorage.setItem('profilePic', '');
            localStorage.setItem('id', '');
            console.log('logout successfully');
        }).then(() => {
            navigate('/');
        }).catch(() => {
            console.log('error');
        })
    }

    useEffect(() => {
        console.log('logout');
    }, []);

    const createTaskScala = async () => {

        const docRef = doc(collection(db, `users/${localStorage.getItem('id')}/tasks`), 'done');
        const doneDocData = {
            name: 'Done',
            items: []
        }
        const inprogressDocData = {
            name: 'In Progress',
            items: []
        }
        const todoDocData = {
            name: 'To Do',
            items: []
        }

        const data = {
            name: "John",
            age: 35,
            city: "New York"
        };


        getDoc(docRef)
            .then(async (doc) => {
                if (doc.exists()) {
                    console.log('data available')
                } else {

                    await setDoc(doc(collection(db, `users/${localStorage.getItem('id')}/tasks`), 'done'), doneDocData, { merge: true });
                    await setDoc(doc(collection(db, `users/${localStorage.getItem('id')}/tasks`), 'inprogress'), inprogressDocData, { merge: true });
                    await setDoc(doc(collection(db, `users/${localStorage.getItem('id')}/tasks`), 'todo'), todoDocData, { merge: true });
                    console.log("Data not available.");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });

        // await addDoc(collection(db, `users/${localStorage.getItem('id')}/task`), {
        //     name: 'To Do',
        // });
    }

    const createTodoScala = async () => {

        const docRef = doc(collection(db, `users/${localStorage.getItem('id')}/todo`), 'done');
        const doneTodoData = {
            files: []
        }


        getDoc(docRef)
            .then(async (doc) => {
                if (doc.exists()) {
                    console.log('data available')
                } else {

                    await setDoc(doc(collection(db, `users/${localStorage.getItem('id')}/todo`), 'done'), doneTodoData, { merge: true });
                    console.log("Data not available.");
                }
            })
            .catch((error) => {
                console.log("Error getting document:", error);
            });

        // await addDoc(collection(db, `users/${localStorage.getItem('id')}/task`), {
        //     name: 'To Do',
        // });
    }

    return (
        <Box>
            <Sidebar rootStyles={{
                [`.${sidebarClasses.container}`]: {
                    backgroundColor: 'grey',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem'
                },
                height: '100%',
            }}>
                <Box>
                    <Avatar sx={{ width: '90px', height: '90px' }} />
                </Box>
                <Divider sx={{ height: '1.5px', width: '100%', bgcolor: 'yellow' }} />
                <Menu>
                    <MenuItem routerLink={<Link to='/home/overview' />}>Overview</MenuItem>
                    {/* <SubMenu label='Activity'>
                        <MenuItem>Revenue</MenuItem>
                        <MenuItem>Expense</MenuItem> */}
                    {/* <MenuItem>Profit</MenuItem>
                        <MenuItem>Net Profit</MenuItem>
                        <MenuItem>Analytics</MenuItem>
                        <MenuItem>Analytics 1.11</MenuItem>
                        <MenuItem>Analytics 1.111</MenuItem>
                        <MenuItem>Analytics 1.111100</MenuItem>
                        <MenuItem>Analytics 1.17</MenuItem>
                        <MenuItem>Analytics 1.1711</MenuItem> */}
                    {/* </SubMenu> */}
                    <MenuItem routerLink={<Link to='/home/activity' />}>Activity</MenuItem>
                    <MenuItem routerLink={<Link to='/home/tasks' />} onClick={createTaskScala}>Tasks</MenuItem>
                    <MenuItem routerLink={<Link to='/home/timeline' />}>Timeline</MenuItem>
                    <MenuItem routerLink={<Link to='/home/calendar' />}>Calendar</MenuItem>
                    <MenuItem routerLink={<Link to='/home/todolist' />} onClick={createTodoScala}>Todo List</MenuItem>
                    <MenuItem routerLink={<Link to='/home/pomodorotimer' />}>Pomodoro Timer</MenuItem>
                </Menu>
                <Divider sx={{ height: '1.5px', width: '100%', bgcolor: 'yellow' }} />
                <Menu rootStyles={{
                    [`.${menuClasses.container}`]: {

                    },
                    width: '100%',
                }}>
                    <MenuItem>Support</MenuItem>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default SideBar