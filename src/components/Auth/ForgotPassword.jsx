import React, { useState } from 'react';
import { FaArrowLeft, FaEnvelope } from 'react-icons/fa';
import AuthLayout from '../auth/AuthLayout';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const ForgotPasswordPage = ({ onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (email) {
        setMessage(`✅ Password reset link sent to ${email}. Check your email.`);
      } else {
        setMessage('❌ Please enter your email address.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <AuthLayout>
      <button
        onClick={onBackToLogin}
        className="flex items-center text-purple-600 hover:text-purple-800 mb-8 font-medium"
      >
        <FaArrowLeft className="mr-2" />
        Back to Login
      </button>

      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Reset Password</h2>
        <p className="text-gray-600">Enter your email to receive reset instructions</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} border`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email Address"
          name="email"
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          startIcon={<FaEnvelope />}
        />

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          fullWidth
          className="text-lg py-4"
        >
          Send Reset Link
        </Button>

        <div className="text-center mt-8">
          <p className="text-gray-600 text-sm">
            Remember your password?{' '}
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-purple-600 font-medium hover:underline"
            >
              Back to Login
            </button>
          </p>
        </div>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          Didn't receive the email? Check your spam folder or{' '}
          <button className="text-purple-600 hover:underline">try again</button>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;