
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { DashboardStats } from '@/lib/types';
import { getDashboardStats } from '@/lib/data';

interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  isLoading: false,
  error: null,
};

// In a real application, this would fetch from a real API
export const fetchDashboardStats = createAsyncThunk(
  'dashboard/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For now, use the existing mock data function
      const stats = getDashboardStats();
      return stats;
      
      // In a real app with backend:
      // const response = await axios.get('/api/dashboard/stats');
      // return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard data');
      }
      return rejectWithValue('Failed to fetch dashboard data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
