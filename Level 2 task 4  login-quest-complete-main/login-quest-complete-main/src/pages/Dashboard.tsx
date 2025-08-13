import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Shield, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your secure area</p>
          </div>
          <Button onClick={signOut} variant="outline" className="gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              User Information
            </CardTitle>
            <CardDescription>
              Your account details and authentication status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-foreground">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="text-foreground font-mono text-sm">{user?.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Created</label>
                <p className="text-foreground">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1">
                    <CheckCircle className="h-3 w-3" />
                    Authenticated
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Features Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Features
            </CardTitle>
            <CardDescription>
              This area demonstrates protected content and authentication
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-border rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-medium">Secure Access</h3>
                <p className="text-sm text-muted-foreground">
                  Only authenticated users can view this page
                </p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium">Protected Routes</h3>
                <p className="text-sm text-muted-foreground">
                  Automatic redirect for unauthenticated users
                </p>
              </div>
              <div className="text-center p-4 border border-border rounded-lg">
                <User className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-medium">User Profiles</h3>
                <p className="text-sm text-muted-foreground">
                  Integrated with Supabase authentication
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example Protected Content */}
        <Card>
          <CardHeader>
            <CardTitle>Protected Content</CardTitle>
            <CardDescription>
              This is an example of content that requires authentication to view
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-foreground">
                🎉 Congratulations! You have successfully accessed the protected area of the application.
              </p>
              <p className="text-muted-foreground">
                This content is only visible to authenticated users. The authentication system includes:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>User registration with email verification</li>
                <li>Secure login/logout functionality</li>
                <li>Protected routes that require authentication</li>
                <li>User profile management</li>
                <li>Session persistence across browser sessions</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;