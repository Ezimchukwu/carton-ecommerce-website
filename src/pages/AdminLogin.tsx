
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Key, LogIn } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
    
    // Mock credentials - in a real app, this would be an API call
    if (username === 'admin' && password === 'admin123') {
      // Set admin auth status in localStorage
      localStorage.setItem('isAdminAuthenticated', 'true');
      
      toast.success('Admin login successful');
      navigate('/admin/pos');
    } else {
      setError('Invalid username or password');
      toast.error('Login failed', {
        description: 'Invalid username or password'
      });
    }
    
    setIsLoading(false);
  };

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('isAdminAuthenticated') === 'true') {
      navigate('/admin/pos');
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container max-w-md mx-auto py-12">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Key className="h-6 w-6" />
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span> 
                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Log In
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <h3 className="font-semibold text-center w-full border-t pt-4">Admin Access Guide</h3>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Default Admin Credentials:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Username: <span className="font-mono bg-gray-100 px-1 rounded">admin</span></li>
                <li>Password: <span className="font-mono bg-gray-100 px-1 rounded">admin123</span></li>
              </ul>
              <p className="mt-2">Admin users can access:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>POS Dashboard - Manage sales and inventory</li>
                <li>Inventory Management - Track and update stock levels</li>
                <li>Sales Reports - View and analyze sales data</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Note: In a production environment, you would use a more secure authentication system 
                with database integration. This is a simplified demo version.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
