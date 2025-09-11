import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('auth/fetchUsers', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get('https://boominati-way.onrender.com/users');
        return res.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await axios.post('https://boominati-way.onrender.com/login', { email, password });
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        users: [],
        currentUser: null,
        isAdmin: false,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.isAdmin = false;
            localStorage.removeItem('token');
        },
        checkToken: (state) => {
            const token = localStorage.getItem('token');
            if (token === 'adminMode') {
                state.currentUser = { email: 'admin', role: 'admin' };
                state.isAdmin = true;
            } else if (token) {
                const user = state.users.find((u) => u.email === token);
                if (user) {
                    state.currentUser = { ...user, role: user.role || (user.email === 'admin@gmail.com' ? 'admin' : 'user') };
                    state.isAdmin = state.currentUser.role === 'admin';
                } else {
                    state.currentUser = null;
                    state.isAdmin = false;
                    localStorage.removeItem('token');
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
                state.users = [];
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                console.log('Fetched users:', action.payload);
                const uniqueUsers = action.payload.reduce((acc, user) => {
                    if (!acc.find((u) => u.email === user.email)) {
                        acc.push({ ...user, role: user.role || (user.email === 'admin@gmail.com' ? 'admin' : 'user') });
                    }
                    return acc;
                }, []);
                state.status = 'succeeded';
                state.users = uniqueUsers;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                console.error('Fetch users error:', action.payload);
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log('Login response:', action.payload);
                const user = action.payload.user || action.payload;
                if (user && user.email) {
                    state.currentUser = { ...user, role: user.role || (user.email === 'admin@gmail.com' ? 'admin' : 'user') };
                    state.isAdmin = state.currentUser.role === 'admin';
                    localStorage.setItem('token', action.payload.token || user.email);
                    window.location.reload()
                    state.error = null;
                } else {
                    state.error = 'Invalid login response';
                }
            })
            .addCase(login.rejected, (state, action) => {
                console.error('Login error:', action.payload);
                state.error = action.payload;
            });
    },
});

export const { logout, checkToken } = authSlice.actions;
export default authSlice.reducer;