import React, { useState } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'
import { useHistory } from 'react-router'

import { http } from '../../../api/auth'

type RegisterInputs = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  passwordRepeat: string
}

export interface serverErrors {
  email: string[]
  password: string[]
  username: string[]
}

/*
  Client side error validation meesages stored in "errors"
  Server side validation stored in "serverErrors"
*/
const Register: React.FC = () => {
  const history = useHistory()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInputs>()
  const [serverErrors, setServerErrors] = useState({} as serverErrors)

  const onSubmit: SubmitHandler<RegisterInputs> = async ({
    firstName,
    lastName,
    username,
    email,
    password,
  }: RegisterInputs) => {
    // clear existing server side errors
    setServerErrors({} as serverErrors)

    // Send credentials to server
    try {
      const response = await http.post('/auth/register/', {
        firstName,
        lastName,
        username,
        email,
        password,
      })
      http.defaults.headers.Authorization = `Bearer response.data.access`
      localStorage.setItem('access_token', response.data.access)
      localStorage.setItem('refresh_token', response.data.refresh)
      history.push('/feed')
    } catch (e) {
      // Show any input validation errors
      setServerErrors((e as any).response.data)
    }
  }

  return (
    <>
      <div className=" bg-white flex flex-col mt-16 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-28 w-auto"
            src="/openbeats.png"
            alt="Open Beats Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold-roboto text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a
              href="#"
              onClick={() => history.push('/login')}
              className="font-medium text-green2 hover:text-green3"
            >
              sign in with exsting account
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    {...register('firstName', {
                      required: 'First Name is required.',
                      minLength: {
                        value: 1,
                        message: 'First name must be at least 8 characters.',
                      },
                      maxLength: {
                        value: 128,
                        message: 'First name must be less than 128 charactrs.',
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.firstName && (
                    <span className="input-error">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    {...register('lastName', {
                      required: 'Last name is required.',
                      minLength: {
                        value: 1,
                        message: 'First name must be at least 8 characters.',
                      },
                      maxLength: {
                        value: 128,
                        message: 'First name must be less than 128 charactrs.',
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.lastName && (
                    <span className="input-error">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    type="username"
                    {...register('username', {
                      required: 'Username is required.',
                      minLength: {
                        value: 1,
                        message: 'Username must be at least 1 characters.',
                      },
                      maxLength: {
                        value: 15,
                        message: 'Username must be less than 15 charactrs.',
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.username && (
                    <span className="input-error">
                      {errors.username.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register('email', {
                      required: 'Email is required.',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Please enter a valid email.',
                      },
                    })}
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.email && (
                    <span className="input-error">{errors.email.message}</span>
                  )}
                  {serverErrors.email && (
                    <span className="input-error">{serverErrors.email}</span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register('password', {
                      required: 'Password is required.',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters.',
                      },
                      maxLength: {
                        value: 128,
                        message: 'Password must be less than 128 characters.',
                      },
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.password && (
                    <span className="input-error">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register('passwordRepeat', {
                      validate: value =>
                        value === watch('password') ||
                        'The passwords do not match',
                    })}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.passwordRepeat && (
                    <span className="input-error">
                      {errors.passwordRepeat!.message}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={() => history.push('/feed')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium-roboto text-white bg-green2 hover:bg-green1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                ></button>
                Create Account
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="!#"
                    className="w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <img
                      src="/loginIcons/google.svg"
                      className="w-7"
                      alt="Google icon"
                    />
                  </a>
                </div>

                <div>
                  <a
                    href="!#"
                    className="w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Apple Music</span>
                    <img
                      src="/loginIcons/apple.svg"
                      className="w-7"
                      alt="Apple Music icon"
                    />
                  </a>
                </div>

                <div>
                  <a
                    href="!#"
                    className="w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Spotify</span>

                    <img
                      src="/loginIcons/spotify.png"
                      className="w-7"
                      alt="Spotify icon"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
