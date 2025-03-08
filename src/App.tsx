
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkAuthStatus } from './redux/slices/authSlice';

import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Classes from "./pages/Classes";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";

const queryClient = new QueryClient();

// Create an AuthProvider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);
  
  return <>{children}</>;
};

// Main App component
const AppContent = () => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  // Login/logout functions are now handled through Redux
  const logout = () => {
    dispatch({ type: 'auth/logout' });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Login />
                )
              } 
            />
            
            {/* Protected routes */}
            <Route element={<Layout logout={logout} />}>
              <Route 
                path="/dashboard" 
                element={
                  isAuthenticated ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              <Route 
                path="/students" 
                element={
                  isAuthenticated ? (
                    <Students />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              <Route 
                path="/classes" 
                element={
                  isAuthenticated ? (
                    <Classes />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
              <Route 
                path="/profile" 
                element={
                  isAuthenticated ? (
                    <Profile />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                } 
              />
            </Route>

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Provider>
  );
};

export default App;
