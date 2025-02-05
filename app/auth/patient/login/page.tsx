'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Lock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AuthNavbar from '@/components/AuthNavbar';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function PatientLoginPage() {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Patient Login Data:', data);
  };

  return (
    <div className="min-h-screen">
      <AuthNavbar />

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="min-h-screen flex"
        >
          {/* Left Side - Blue Background */}
          <div className="w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 flex flex-col justify-center items-center text-white px-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="p-4 bg-white/20 rounded-lg inline-block">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold mt-4">Welcome Back</h2>
              <p className="opacity-80 mt-2">Login to access your healthcare records.</p>
            </motion.div>
          </div>

          {/* Right Side - White Background */}
          <div className="w-1/2 bg-white flex flex-col justify-center px-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Patient Login</h2>
              <p className="text-gray-600">Securely access your health records</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="patient@example.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  {...register('password')}
                  type="password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/auth/patient/signup" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}