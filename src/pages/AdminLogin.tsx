
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // For demo purposes, we're using a simple hardcoded check
  // In a real application, this should be replaced with proper authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple timeout to simulate API call
    setTimeout(() => {
      if (username === 'admin' && password === 'password123') {
        localStorage.setItem('admin_authenticated', 'true');
        toast({
          title: "Login successful",
          description: "Welcome to the admin dashboard",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-wedding-off-white">
      <Card className="w-full max-w-md border-wedding-black border rounded-none">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-light">Admin Login</CardTitle>
          <CardDescription>Enter your credentials to access the CMS</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">Username</label>
                <Input
                  id="username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="rounded-none border-wedding-black"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-none border-wedding-black"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Default credentials: admin / password123
                </p>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full mt-6 bg-wedding-black text-wedding-white hover:bg-wedding-dark-gray rounded-none"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            This is a secure area. Unauthorized access is prohibited.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
