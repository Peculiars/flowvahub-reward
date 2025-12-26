import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthCard } from '../components/auth/AuthCard';
import { Input } from '../components/ui/Input';
import { PasswordInput } from '../components/ui/PasswordInput';
import { Button } from '../components/ui/Button';
import { Divider } from '../components/ui/Divider';
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';
import { useAuth } from '../context/AuthContext';
import { Info } from 'lucide-react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const params = new URLSearchParams(window.location.search);
  const rawRef = params.get('ref');

  
  const { signUp, signInWithGoogle } = useAuth();
  
  const referralCode = rawRef && rawRef !== 'undefined' ? rawRef : null;
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signUp(email, password, referralCode);

      if (result.success) {
        setSuccess(result.message || 'Account created! Check your email to verify.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        const errorMsg = typeof result.error === 'string' ? result.error : result.error?.message ?? 'Failed to create account';
        const lowerError = errorMsg.toLowerCase();    

        if (lowerError.includes('already registered') || 
            lowerError.includes('already exists') ||
            lowerError.includes('already been registered')) {
          setError('This email is already registered. Please login instead.');
        } else if (lowerError.includes('email address is invalid')) {
          setError('Please enter a valid email address.');
        } else if (lowerError.includes('password')) {
          setError('Password is too weak. Please use a stronger password.');
        } else {
          setError(errorMsg);
        }
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error('Google sign-in error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Google sign-in failed. Please try again.'
      );
    }
  };

  return (
    <AuthCard title="Create Your Account" subtitle="Sign up to manage your tools">
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center space-x-1">
            <Info className="size-4 text-green-600" />
            <p className="text-sm text-green-800">{success}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center space-x-1">
            <Info className="size-4 text-red-500" />
            <p className="text-sm text-red-500">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full text-[#111827]">
        <Input
          type="email"
          label="Email"
          placeholder="your@email.com"
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

        <PasswordInput
          label="Confirm Password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <Button type="submit" isLoading={isLoading} disabled={isLoading}>
          Sign up Account
        </Button>
      </form>

      <Divider />

      <GoogleSignInButton onClick={handleGoogleSignIn} />

      <div className="text-center mt-5 text-sm">
        <p className="text-[#6B7280]">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-[#9013fe] no-underline font-medium hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </AuthCard>
  );
};

export default Signup;