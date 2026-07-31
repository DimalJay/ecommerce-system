import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { AuthFormCard } from '../components/auth';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';
import { request } from '../lib/request';

export const AuthPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();
  const { toastMessage, triggerToast } = useToast();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      triggerToast('Please enter both email and password.');
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const nameParts = name.trim().split(' ');
    const first_name = nameParts[0] || 'First';
    const last_name = nameParts.slice(1).join(' ') || 'Last';

    // First try to login
    request('/auth/login', {
      method: 'POST',
      data: { email: normalizedEmail, password }
    })
      .then((res) => {
        const userDetails = res.data;
        login(userDetails.user.email, `${userDetails.user.firstName} ${userDetails.user.lastName}`);
        triggerToast(`Welcome back, ${userDetails.user.firstName}!`);
        setTimeout(() => navigate('/'), 1000);
      })
      .catch((err) => {
        // If login failed, attempt registration if name is provided
        if (name.trim()) {
          request('/auth/register', {
            method: 'POST',
            data: { email: normalizedEmail, password, first_name, last_name }
          })
            .then(() => {
              // Successfully registered, now login
              return request('/auth/login', {
                method: 'POST',
                data: { email: normalizedEmail, password }
              });
            })
            .then((res) => {
              const userDetails = res.data;
              login(userDetails.user.email, `${userDetails.user.firstName} ${userDetails.user.lastName}`);
              triggerToast(`Account created successfully! Welcome ${userDetails.user.firstName}`);
              setTimeout(() => navigate('/'), 1000);
            })
            .catch((regErr) => {
              triggerToast(regErr.message || 'Registration failed.');
            });
        } else {
          triggerToast(err.message || 'Login failed. Please fill in your name to register if you are new.');
        }
      });
  };

  const handleGoogleLogin = () => {
    login('user.google@gmail.com', 'Google User');
    triggerToast('Logged in successfully via Google');
    setTimeout(() => navigate('/'), 1000);
  };

  return (
    <AppLayout>
      {toastMessage && <Toast message={toastMessage} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-16 w-full flex-1 flex flex-col items-center justify-center min-h-[650px]">
        <div className="w-full max-w-md text-left mb-6">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer">
            <ArrowLeft size={14} /> Back to Atelier Shop
          </Link>
        </div>

        <AuthFormCard email={email} setEmail={setEmail} password={password} setPassword={setPassword}
          name={name} setName={setName} onSubmit={handleSubmit} onGoogleLogin={handleGoogleLogin}
        />
      </main>
    </AppLayout>
  );
};

export default AuthPage;
