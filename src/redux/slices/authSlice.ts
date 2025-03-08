
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/lib/types';
import { toast } from 'sonner';

// Define the auth state interface
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Initialize state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
};

// Create async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      // For now, simulate API call with the existing mock logic
      // In a real app, this would be an actual API call
      if (credentials.email === "teacher@example.com" && credentials.password === "password") {
        // Create a mock JWT token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiTXMuIEplc3NpY2EgUGFya2VyIiwiZW1haWwiOiJ0ZWFjaGVyQGV4YW1wbGUuY29tIiwicm9sZSI6InRlYWNoZXIifQ.3KGV-Xy-NgGFd4XlCWxOxs_XlwmxmhO1CG_MLN_PnJk';
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Decode user info from token
        const user = jwtDecode(token) as User;
        
        return { user, token };
      } else {
        return rejectWithValue('Invalid email or password');
      }
      
      // In a real application with actual backend:
      // const response = await axios.post('/api/auth/login', credentials);
      // localStorage.setItem('token', response.data.token);
      // return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Login failed');
      }
      return rejectWithValue('Login failed');
    }
  }
);

// Create async thunk for logout
export const logoutUser = createAsyncThunk('auth/logout', async () => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  return null;
});

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    checkAuthStatus(state) {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = jwtDecode(token) as User;
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
        } catch (error) {
          localStorage.removeItem('token');
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
      } else {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      })
      // Logout cases
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { checkAuthStatus } = authSlice.actions;
export default authSlice.reducer;
