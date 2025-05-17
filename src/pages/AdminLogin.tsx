
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Key, LogIn, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');

  // For registration
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');

  // Check if already authenticated on mount
  useEffect(() => {
    if (localStorage.getItem('isAdminAuthenticated') === 'true') {
      navigate('/admin/pos');
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
    
    // Get saved admin credentials from localStorage
    const savedAdminUsername = localStorage.getItem('adminUsername') || 'admin';
    const savedAdminPassword = localStorage.getItem('adminPassword') || 'admin123';
    
    if (username === savedAdminUsername && password === savedAdminPassword) {
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

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
    
    // In a production environment, you would check against a secure key
    // For this demo, we'll use a simple key
    const masterAdminKey = 'master-admin-key-2024';
    
    if (adminKey !== masterAdminKey) {
      setError('Invalid admin master key');
      setIsLoading(false);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Save the new admin credentials
    localStorage.setItem('adminUsername', newUsername);
    localStorage.setItem('adminPassword', newPassword);
    
    toast.success('Admin account created successfully');
    setActiveTab('login');
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
              Admin Portal
            </CardTitle>
            <CardDescription>
              Secure access to the administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
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
              </TabsContent>

              <TabsContent value="register">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-username">New Username</Label>
                    <Input
                      id="new-username"
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-key">Admin Master Key</Label>
                    <Input
                      id="admin-key"
                      type="password"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      required
                    />
                    <p className="text-xs text-gray-500">Required for creating admin accounts.</p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span> 
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create Admin Account
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <h3 className="font-semibold text-center w-full border-t pt-4">Admin Access Information</h3>
            <div className="space-y-2 text-sm">
              {activeTab === 'login' && (
                <>
                  <p className="font-medium">Default Admin Credentials:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Username: <span className="font-mono bg-gray-100 px-1 rounded">admin</span></li>
                    <li>Password: <span className="font-mono bg-gray-100 px-1 rounded">admin123</span></li>
                  </ul>
                </>
              )}
              {activeTab === 'register' && (
                <p className="text-sm text-gray-700">
                  Creating a new admin account allows you to set up custom login credentials.
                  The default admin master key is only available to authorized personnel.
                </p>
              )}
              <p className="mt-2">Admin users can access:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>POS Dashboard - Manage sales and inventory</li>
                <li>Inventory Management - Track and update stock levels</li>
                <li>Sales Reports - View and analyze sales data</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Note: In a production environment, admin accounts should be managed with a more secure authentication system.
                This is a simplified demo version.
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default AdminLogin;
