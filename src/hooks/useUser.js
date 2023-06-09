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
            } else {
                setUsers(listUsers);
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

    const getUserIntelligence = (name) => {
        const existingUser = users.find((existingUser) => existingUser.name === name);

        if (existingUser) {
            return existingUser.intelligence;
        }
    }

    const getUserSubIntelligence = (name) => {
        const existingUser = users.find((existingUser) => existingUser.name === name);

        if (existingUser) {
            return existingUser.subIntelligence;
        }
    }

    const setUserIntelligence = (name, newIntelligence, newSubIntelligence) => {
        const index = users.findIndex((user) => user.name === name);

        if (index !== -1) {
            const updateUsers = [...users];
            updateUsers[index].intelligence = newIntelligence;
            updateUsers[index].subIntelligence = newSubIntelligence;
            setUsers(updateUsers);
        }
    }

    const createUser = (user) => {
        const existingUser = users.find((existingUser) => existingUser.name === user.name);

        if (existingUser) {
            return 'User already exists';
        } else {
            const newUser = { id: generate(), name: user.name, password: user.password, intelligence: 'default', subIntelligence: 'default' };
            setUsers([...users, newUser]);
            return 'User created';
        }
    };

    const searchUserMatches = (nameUser, intelligenceUser, subIntelligence) => {
        const matches = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].name !== nameUser) {
                if (
                    users[i].intelligence === intelligenceUser ||
                    users[i].intelligence === subIntelligence ||
                    users[i].subIntelligence === intelligenceUser
                ) {
                    matches.push(users[i]);
                }
            }
        }

        matches.sort((a, b) => {
            if (a.intelligence === intelligenceUser || a.intelligence === subIntelligence &&
                b.intelligence !== intelligenceUser) {
                return -1;
            } else if (a.intelligence !== intelligenceUser &&
                b.intelligence === intelligenceUser || b.intelligence === subIntelligence) {
                return 1;
            } else {
                return a.intelligence.localeCompare(b.intelligence);
            }
        });

        return matches;
    }

    const resetUsers = async () => {
        try {
            await AsyncStorage.removeItem('@UserListStore:Users');
            loadUsers();
        } catch (e) {
            console.log(e);
        }
    };

    const deleteUserAccount = (userAccount) => {
        const index = users.findIndex((user) => user.name === userAccount.name && user.password === userAccount.password);
        if (index !== -1) {
            users.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    return { users: users, loginUser, createUser, getUserIntelligence, getUserSubIntelligence, setUserIntelligence, searchUserMatches, resetUsers, deleteUserAccount };
}

export default useUser;