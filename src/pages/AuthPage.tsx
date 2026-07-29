import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AppLayout } from '../components';
import { AuthFormCard } from '../components/auth';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/useToast';
import { Toast } from '../components/ui';

export const AuthPage: React.FC = () => {
  const { login } = useCart();
  const navigate = useNavigate();
  const { toastMessage, triggerToast } = useToast();

  const handleLoginSuccess = (userData: { email: string; name: string; id?: string; first_name?: string; last_name?: string }) => {
    login(userData.email, userData.name, {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
    });
    triggerToast(`Welcome back, ${userData.name}!`);
    setTimeout(() => navigate('/order-history'), 1000);
  };

  const handleRegisterSuccess = (message: string) => {
    triggerToast(message || 'Account created successfully!');
  };

  const handleError = (errorMsg: string) => {
    triggerToast(errorMsg);
  };

  return (
    <AppLayout>
      {toastMessage && <Toast message={toastMessage} />}

      <main className="max-w-7xl mx-auto px-4 sm:px-10 py-16 w-full flex-1 flex flex-col items-center justify-center min-h-[650px]">
        <div className="w-full max-w-md text-left mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-luxury-gold hover:text-luxury-gold-dark transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Atelier Shop
          </Link>
        </div>

        <AuthFormCard
          onLoginSuccess={handleLoginSuccess}
          onRegisterSuccess={handleRegisterSuccess}
          onError={handleError}
        />
      </main>
    </AppLayout>
  );
};

export default AuthPage;
