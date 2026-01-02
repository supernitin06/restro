import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
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

    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        joined: new Date().toLocaleDateString()
      };

      setMessage('🎉 Account created successfully!');

      // Store demo data
      localStorage.setItem('demo_users', JSON.stringify([
        ...JSON.parse(localStorage.getItem('demo_users') || '[]'),
        newUser
      ]));

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });

      setTimeout(() => {
        alert(`Welcome ${newUser.name}! Your account has been created.`);
        onSwitchToLogin();
      }, 1500);

      setLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Create Account</h2>
        <p className="text-gray-600">Join our foodie community today</p>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-700 border border-green-200">
          <div className="flex items-center">
            <span className="mr-2">🎉</span>
            <span>{message}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Full Name"
          name="fullName"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          startIcon={<FaUser />}
          required
        />

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Email Address"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            startIcon={<FaEnvelope />}
            required
          />

          <InputField
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="1234567890"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            startIcon={<FaPhone />}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <InputField
            label="Password"
            name="password"
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            startIcon={<FaLock />}
            required
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            startIcon={<FaLock />}
            required
          />
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            name="agreeToTerms"
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-5 w-5 mt-1 text-red-600 focus:ring-red-500 border-gray-300 rounded"
          />
          <label htmlFor="agreeToTerms" className="ml-3 text-gray-700">
            I agree to the{' '}
            <a href="#terms" className="text-red-600 font-medium hover:underline">Terms</a>
            {' '}and{' '}
            <a href="#privacy" className="text-red-600 font-medium hover:underline">Privacy Policy</a>
          </label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1 ml-8">{errors.agreeToTerms}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          fullWidth
          className="text-lg py-4 mt-6"
        >
          Create Account
        </Button>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-red-600 font-bold hover:text-red-800 hover:underline text-lg"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>

      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-center text-gray-500 text-sm">
          By creating an account, you agree to receive updates from us.
        </p>
      </div>
    </div>
  );
};

export default SignupForm;