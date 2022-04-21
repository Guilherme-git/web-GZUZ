import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/index';

export const LoginRedux = createAsyncThunk('auth/LoginUserAsync', async (payload) => {
    const response = await axios.post("/auth", payload)

    if (response.data.message == "No registered user") {
        return response.data.message
    } else {
        return response.data[0]
    }
});

export const RegisterUserRedux = createAsyncThunk('/user/create', async (payload) => {
   const response = await axios.post('/user/create', payload);
   return response.data.message;
});

export const RegisterDriverRedux = createAsyncThunk('/driver/create', async (payload) => {
    const response = await axios.post('/driver/create', payload);
    return response.data.message;
 });

const initialState = {
    status: 'idle',
    authenticated: false,
    ErrorAuth: '',
    user: {},
};

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setNovo: (state, action) => {
            state.user = action.payload;
        },
        setResetStatus: (state) => {
            state.status = 'idle';
        },
        logoutUser: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(LoginRedux.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(LoginRedux.fulfilled, (state, action) => {
            if (action.payload == 'No registered user') {
                state.status = 'failed'
            } else {
                state.status = 'success';
                state.user = action.payload
            } 
        });
        builder.addCase(LoginRedux.rejected, (state, action) => {
            state.status = 'failed';
        });

        //-------------------------------------------------------------------

        builder.addCase(RegisterUserRedux.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(RegisterUserRedux.fulfilled, (state, action) => {
            if(action.payload === 'create') {
                state.status = 'success';
            }
        });
        builder.addCase(RegisterUserRedux.rejected, (state, action) => {
            state.status = 'failed';
        });

        //-------------------------------------------------------------------

        builder.addCase(RegisterDriverRedux.pending, (state, action) => {
            state.status = 'loading';
        });
        builder.addCase(RegisterDriverRedux.fulfilled, (state, action) => {
            if(action.payload === 'create') {
                state.status = 'success';
            }
        });
        builder.addCase(RegisterDriverRedux.rejected, (state, action) => {
            state.status = 'failed';
        });
    },
});


export const { logoutUser, setNovo, setResetStatus } = LoginSlice.actions;

export default LoginSlice.reducer;