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
            if (token) {
                const user = state.users.find((u) => u.email === token);
                if (user) {
                    state.currentUser = user;
                    state.isAdmin = user.role === 'admin';
                }
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.currentUser = action.payload.user;
                state.isAdmin = action.payload.user.role === 'admin';
                localStorage.setItem('token', action.payload.token);
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout, checkToken } = authSlice.actions;
export default authSlice.reducer;