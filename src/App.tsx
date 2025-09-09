import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { FacultyDashboard } from "./pages/dashboards/FacultyDashboard";
import { AdminDashboard } from "./pages/dashboards/AdminDashboard";
import NotFound from "./pages/NotFound";

// Layout
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Route Protection
import { ProtectedRoute, PublicOnlyRoute, getRoleDashboard } from "./components/ProtectedRoute";
import { useAuth } from "./store/authStore";

const queryClient = new QueryClient();

const App = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                <PublicOnlyRoute>
                  <LandingPage />
                </PublicOnlyRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicOnlyRoute>
                  <LoginPage />
                </PublicOnlyRoute>
              } 
            />

            {/* Protected Routes with Layout */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Navigate 
                    to={user ? getRoleDashboard(user.role) : '/login'} 
                    replace 
                  />
                </ProtectedRoute>
              } 
            />

            {/* Faculty Routes */}
            <Route 
              path="/faculty" 
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<FacultyDashboard />} />
              <Route index element={<Navigate to="/faculty/dashboard" replace />} />
            </Route>

            {/* HoD Routes */}
            <Route 
              path="/hod" 
              element={
                <ProtectedRoute allowedRoles={['hod']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<div>HoD Dashboard - Coming Soon</div>} />
              <Route index element={<Navigate to="/hod/dashboard" replace />} />
            </Route>

            {/* Director Routes */}
            <Route 
              path="/director" 
              element={
                <ProtectedRoute allowedRoles={['director']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<div>Director Dashboard - Coming Soon</div>} />
              <Route index element={<Navigate to="/director/dashboard" replace />} />
            </Route>

            {/* Registrar Routes */}
            <Route 
              path="/registrar" 
              element={
                <ProtectedRoute allowedRoles={['registrar']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<div>Registrar Dashboard - Coming Soon</div>} />
              <Route index element={<Navigate to="/registrar/dashboard" replace />} />
            </Route>

            {/* Office Head Routes */}
            <Route 
              path="/office-head" 
              element={
                <ProtectedRoute allowedRoles={['office_head']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<div>Office Head Dashboard - Coming Soon</div>} />
              <Route index element={<Navigate to="/office-head/dashboard" replace />} />
            </Route>

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
            </Route>

            {/* Utility Routes */}
            <Route 
              path="/unauthorized" 
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
                    <p className="text-muted-foreground">You don't have permission to access this page.</p>
                  </div>
                </div>
              } 
            />

            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
