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

    const getUser = (name) => {
        const existingUser = users.find((existingUser) => existingUser.name === name);

        if (existingUser) {
            return existingUser.intelligence;
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


    return { users: users, loginUser, createUser, getUser};
}

export default useUser;