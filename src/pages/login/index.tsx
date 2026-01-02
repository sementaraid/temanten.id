import { motion } from 'motion/react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import useSWRMutation from 'swr/mutation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { postFetcher } from '@/lib/fetcher'
import { Link, useNavigate } from 'react-router'
import { createSessionSchema } from '@shared/schema'
import { authCallback } from '@/lib/auth'

type LoginSchema = z.infer<typeof createSessionSchema>
type LoginResponse = {
  message: string,
  token: string,
}

export const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { trigger } = useSWRMutation<
    LoginResponse,
    Error,
    string,
    LoginSchema
  >(`/api/auth/sign-in`, postFetcher())

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await trigger({
        email: data.email,
        password: data.password
      })

      if(!response) throw Error('Failed to attempt login')
      const {user} = await authCallback(response.token)
      if(user.role === 'admin') navigate('/dashboard')
      else navigate('/my-invitations/list')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Header */}
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2 text-gray-400" size={18} />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a
                  href="#"
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  Forgot?
                </a>
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-2 text-gray-400" size={18} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="emerald"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer Links */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link className="text-emerald-600 font-medium" to="/sign-up">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>

      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © 2025 Temanten.id. All rights reserved.
      </footer>
    </div>
  )
}
