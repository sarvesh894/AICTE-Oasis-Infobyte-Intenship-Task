import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, User, ArrowRight, LogIn, UserPlus } from 'lucide-react';

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-2xl font-bold text-foreground">SecureApp</h1>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Badge variant="secondary" className="gap-1">
                    <User className="h-3 w-3" />
                    {user.email}
                  </Badge>
                  <Button onClick={() => navigate('/dashboard')} variant="default">
                    Dashboard
                  </Button>
                  <Button onClick={signOut} variant="outline">
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild variant="outline">
                    <Link to="/auth">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/auth">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Secure Authentication System
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            A complete login authentication system with user registration, secure login, 
            and protected content access built with React and Supabase.
          </p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/auth">
                  <LogIn className="h-5 w-5 mr-2" />
                  Sign In
                </Link>
              </Button>
            </div>
          ) : (
            <Button onClick={() => navigate('/dashboard')} size="lg">
              <ArrowRight className="h-5 w-5 mr-2" />
              Go to Dashboard
            </Button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Authentication Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>User Registration</CardTitle>
                <CardDescription>
                  Secure user registration with email verification and profile creation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Email verification</li>
                  <li>• Secure password handling</li>
                  <li>• Automatic profile creation</li>
                  <li>• Form validation</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Login</CardTitle>
                <CardDescription>
                  Robust authentication with session management and security features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Encrypted passwords</li>
                  <li>• Session persistence</li>
                  <li>• Auto token refresh</li>
                  <li>• Remember login state</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Protected Routes</CardTitle>
                <CardDescription>
                  Access control for sensitive areas with automatic redirects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Route protection</li>
                  <li>• Automatic redirects</li>
                  <li>• User role management</li>
                  <li>• Secure content access</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            Built with React, TypeScript, Tailwind CSS, and Supabase
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
