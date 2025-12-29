import React, { useState } from 'react';
import LoginForm from '../auth/Login';
import SignupForm from '../auth/Signup';
import ForgotPasswordPage from '../auth/ForgotPassword';
import ToggleSwitch from '../ui/ToggleSwitch';
import AuthLayout from '../auth/AuthLayout';

const AuthContainer = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (showForgotPassword) {
    return (
      <ForgotPasswordPage 
        onBackToLogin={() => setShowForgotPassword(false)}
      />
    );
  }

  return (
    <AuthLayout 
      showTabs={true}
      activeTab={isLogin ? 'login' : 'signup'}
      onTabChange={(tab) => setIsLogin(tab === 'login')}
    >
      <ToggleSwitch isLogin={isLogin} onToggle={setIsLogin} />
      
      {isLogin ? (
        <LoginForm 
          onSwitchToSignup={() => setIsLogin(false)}
          onSwitchToForgotPassword={() => setShowForgotPassword(true)}
        />
      ) : (
        <SignupForm 
          onSwitchToLogin={() => setIsLogin(true)}
        />
      )}
    </AuthLayout>
  );
};

export default AuthContainer;