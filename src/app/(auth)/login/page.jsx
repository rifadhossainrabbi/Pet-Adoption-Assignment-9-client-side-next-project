'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client'; // আপনার লিভ ফোল্ডার থেকে পাথ ঠিক করে নিন
import { useRouter } from 'next/navigation';

const LogInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginFunc = async data => {
    console.log(data);
    setLoading(true);
    try {
      const { data: res, error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/',
      });

      if (error) {
        toast.error(error.message || 'Login failed!');
      } else {
        toast.success('Successfully Logged In!');
        router.push('/');
      }
    } catch (err) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/',
    });
  };

  return (
    <div className="container mx-auto min-h-[90vh] flex justify-center items-center p-4">
      <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-2xl w-full max-w-md transition-all duration-300 hover:border-amber-400">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black mb-2">
            <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h2>
          <p className="text-gray-500 text-sm">
            Please enter your details to login
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(handleLoginFunc)}>
          {/* Email field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                errors.email
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
              }`}
              placeholder="name@example.com"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs ml-1">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={isShowPassword ? 'text' : 'password'}
                className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                  errors.password
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                }`}
                placeholder="••••••••"
                {...register('password', { required: 'Password is required' })}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-600 transition-colors"
                onClick={() => setIsShowPassword(!isShowPassword)}
              >
                {isShowPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
            </div>
            {errors.password && (
              <span className="text-red-500 text-xs ml-1">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <Link
              href="#"
              className="text-xs font-semibold text-amber-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            disabled={loading}
            className={`w-full py-3.5 rounded-xl text-white font-bold text-lg shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-amber-200'
            }`}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-400 font-medium italic">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex justify-center items-center gap-3 px-4 py-3 border-2 border-gray-100 rounded-xl font-bold text-gray-700 hover:bg-gray-50 hover:border-amber-200 transition-all active:scale-95"
        >
          <FcGoogle size={22} />
          <span>Google Account</span>
        </button>

        {/* Footer Link */}
        <p className="mt-8 text-center text-sm text-gray-600 font-medium">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="text-amber-600 font-bold hover:text-amber-700 underline underline-offset-4"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LogInPage;
