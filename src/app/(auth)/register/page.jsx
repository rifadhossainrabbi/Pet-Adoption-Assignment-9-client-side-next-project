'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { authClient } from '@/lib/auth-client';

const RegisterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const handleRegisterFunc = async data => {
    setLoading(true);
    try {
      const { name, email, password, image } = data;
      const { data: res, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
      });

      if (error) {
        toast.error(error.message || 'Registration failed!');
      } else {
        toast.success('Registration successful!');
        router.push('/login');
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <div className="container mx-auto min-h-[90vh] flex justify-center items-center py-10 px-4">
      <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-2xl w-full max-w-md transition-all duration-300 hover:border-amber-400">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2">
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Create Account
            </span>
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Join our pet adoption community
          </p>
        </div>

        <form onSubmit={handleSubmit(handleRegisterFunc)} className="space-y-4">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Full Name
            </label>
            <input
              type="text"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-amber-500'}`}
              placeholder="John Doe"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs ml-1">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-amber-500'}`}
              placeholder="name@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs ml-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Photo URL Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Photo URL (Optional)
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-amber-500 transition-all"
              placeholder="https://image-link.com"
              {...register('image')}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-amber-500'}`}
                placeholder="Enter Password..."
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Must be at least 6 characters',
                  },
                  validate: value => {
                    if (
                      value === value.toLowerCase() ||
                      value === value.toUpperCase()
                    ) {
                      return 'Must contain at least one uppercase and one lowercase letter';
                    }
                    return true;
                  },
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs ml-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-amber-500'}`}
                placeholder="Retype Password..."
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: value =>
                    value === password || 'Passwords do not match',
                })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-xs ml-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Register Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2 ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-amber-500 to-orange-600'}`}
          >
            {loading ? (
              <span className="">Creating account...</span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm font-medium italic">
            <span className="px-3 bg-white text-gray-400">
              Or register with
            </span>
          </div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-3 px-4 py-3 border-2 border-gray-100 rounded-xl font-bold text-gray-700 hover:bg-gray-50 hover:border-amber-200 transition-all active:scale-95"
        >
          <FcGoogle size={22} />
          <span>Sign up with Google</span>
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-600 font-medium">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-amber-600 font-bold hover:text-amber-700 underline underline-offset-4"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
