import { useEffect, useState } from 'react';
import { generate } from 'shortid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import listUsers from '../../data/listUsers.json';

const useUser = () => {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        try {
            const userData = await AsyncStorage.getItem('@UserListStore:Users');
            if (userData) {
                const user = JSON.parse(userData);
                setUsers(user);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const resetUsers = async () => {
        try {
            await AsyncStorage.removeItem('@UserListStore:Users');
            setUsers([]);
        } catch (e) {
            console.log(e);
        }
    };


    //Load users
    useEffect(() => {
        if (users.length) return;
        loadUsers();
    }, []);

    //Save users
    useEffect(() => {
        const storeUsers = async () => {
            try {
                await AsyncStorage.setItem('@UserListStore:Users', JSON.stringify(users));
            } catch (e) {
                console.log(e);
            }
        }
        storeUsers();
    }, [users]);

    const loginUser = (user) => {
        const existingUser = users.find((existingUser) => existingUser.name === user.name);

        if (existingUser) {
            if (existingUser.password === user.password) {
                return 'Logged in';
            } else {
                return 'Invalid credentials';
            }
        } else {
            return 'User not found';
        }
    };

    const getUserIntelligence = (name) => {
        const existingUser = users.find((existingUser) => existingUser.name === name);

        if (existingUser) {
            return existingUser.intelligence;
        }
    }

    const setUserIntelligence = (name, newInelligence) => {
        const index = users.findIndex((user) => user.name === name);

        if (index !== -1) {
            const updateUsers = [...users];
            updateUsers[index].intelligence = newInelligence;
            setUsers(updateUsers);
        }
    }

    const createUser = (user) => {
        const existingUser = users.find((existingUser) => existingUser.name === user.name);

        if (existingUser) {
            return 'User already exists';
        } else {
            const newUser = { id: generate(), name: user.name, password: user.password, intelligence: 'default' };
            setUsers([...users, newUser]);
            return 'User created';
        }
    };

    return { users: users, loginUser, createUser, getUserIntelligence, setUserIntelligence };
}

export default useUser;