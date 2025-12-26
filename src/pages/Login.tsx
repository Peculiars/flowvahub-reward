import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';
import { useAuth } from '../context/AuthContext';
import { Info } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    const { signIn, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  try {
    const { data, error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      return;
    }

    if (!data.session) {
      setError('Login failed. No session created.');
      return;
    }
    
    navigate('/dashboard/earn-rewards');
  } catch {
    setError('An unexpected error occurred');
  } finally {
    setIsLoading(false);
  }
};


    const handleGoogleSignIn = async () => {
      try {
        await signInWithGoogle();
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Google sign-in failed. Please try again.'
        );
      }
    };


  return (
    <AuthCard title="Log in to flowva" subtitle="Log in to receive personalized recommendations">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center space-x-1">
            <Info className="size-4 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full text-[#111827]">
        <Input
          type="email"
          label="Email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <PasswordInput
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <div className="flex justify-end items-center w-full mb-2">
          <Link 
            to="/forgot-password" 
            className="mt-2 text-[#9013fe] no-underline text-sm font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <Button type="submit" isLoading={isLoading}>
          Sign in
        </Button>
      </form>

      <Divider />

      <GoogleSignInButton onClick={handleGoogleSignIn} />

      <div className="text-center mt-5 text-sm">
        <p className="text-[#6B7280]">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-[#9013fe] no-underline font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Login;