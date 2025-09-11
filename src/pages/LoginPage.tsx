import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { useAuth } from '../store/authStore';
import { getRoleDashboard } from '../components/ProtectedRoute';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(values.email, values.password);
      
      // After successful login, navigate to the appropriate page
      if (from === '/') {
        // Redirect to dashboard (will be handled by App.tsx routing)
        navigate('/dashboard', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Demo credentials info
  const demoCredentials = [
    { role: 'Faculty', email: 'faculty@example.com', password: 'password123' },
    { role: 'HoD', email: 'hod@example.com', password: 'password123' },
    { role: 'Director', email: 'director@example.com', password: 'password123' },
    { role: 'Admin', email: 'admin@example.com', password: 'password123' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 hero-gradient opacity-50" />
      
      <div className="relative w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center text-primary hover:text-primary-hover mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-lg primary-gradient flex items-center justify-center">
              <span className="text-white font-bold">FP</span>
            </div>
            <h1 className="text-2xl font-bold">Faculty Performance</h1>
          </div>
          <p className="text-muted-foreground">Evaluation System</p>
        </div>

        <Card className="academic-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className={errors.email && touched.email ? 'border-destructive' : ''}
                    />
                    {errors.email && touched.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className={`pr-10 ${errors.password && touched.password ? 'border-destructive' : ''}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.password && touched.password && (
                      <p className="text-sm text-destructive mt-1">{errors.password}</p>
                    )}
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <div className="text-center">
                    <Link 
                      to="/forgot-password" 
                      className="text-sm text-primary hover:text-primary-hover"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        {/* Demo credentials */}
        <Card className="mt-6 academic-card">
          <CardHeader>
            <CardTitle className="text-lg">Demo Credentials</CardTitle>
            <CardDescription>
              Use these credentials to explore different user roles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">{cred.role}</p>
                  <p className="text-xs text-muted-foreground">{cred.email}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    // Direct login with demo credentials
                    setIsLoading(true);
                    setError(null);
                    try {
                      await login(cred.email, cred.password);
                      navigate('/dashboard', { replace: true });
                    } catch (err: any) {
                      setError(err.message || 'Login failed. Please try again.');
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};