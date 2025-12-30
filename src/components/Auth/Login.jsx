import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';

import InputField from '../ui/InputField';
import Button from '../ui/Button';

const LoginForm = ({ onSwitchToSignup, onSwitchToForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    setMessage('');

    // Demo login logic
    setTimeout(() => {
      const demoUsers = [
        { email: 'user@example.com', password: 'password123' },
        { email: 'demo@demo.com', password: 'demo123' }
      ];

      const isValid = demoUsers.some(
        user => user.email === formData.email && user.password === formData.password
      );

      if (isValid) {
        setMessage('✅ Login successful! Welcome back.');

        // Store demo data
        localStorage.setItem('auth_user', JSON.stringify({
          email: formData.email,
          name: 'Demo User',
          timestamp: new Date().toISOString()
        }));

        setTimeout(() => {
          alert('Redirecting to dashboard...');
        }, 1500);
      } else {
        setMessage('❌ Invalid credentials. Try: demo@demo.com / demo123');
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h2>
        <p className="text-gray-600">Sign in to continue to your account</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          <div className="flex items-center">
            <span className="mr-2">{message.includes('✅') ? '✅' : '❌'}</span>
            <span>{message.replace('✅', '').replace('❌', '')}</span>
          </div>
          {message.includes('Invalid') && (
            <div className="text-sm mt-2 bg-yellow-50 p-2 rounded">
              <strong>Demo Credentials:</strong> demo@demo.com / demo123
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          startIcon={<FaEnvelope />}
          required
        />

        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          startIcon={<FaLock />}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-gray-700 font-medium">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-purple-600 hover:text-purple-800 font-medium hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          loading={loading}
          fullWidth
          className="text-lg py-4 mt-6"
        >
          Sign In
        </Button>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-purple-600 font-bold hover:text-purple-800 hover:underline text-lg"
            >
              Create Account
            </button>
          </p>
        </div>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          By signing in, you agree to our{' '}
          <a href="#terms" className="text-purple-600 hover:underline">Terms</a>
          {' '}and{' '}
          <a href="#privacy" className="text-purple-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;