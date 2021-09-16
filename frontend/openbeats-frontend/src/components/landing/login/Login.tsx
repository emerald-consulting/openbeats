import { useHistory } from "react-router";
import LandingNav from "../../nav/LandingNav";
const Login = () => {
  const history = useHistory();

  return (

    <>
    <div className=" bg-gray-50 flex flex-col mt-16 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-28 w-auto" // https://tailwindcss.com/docs/height
          src="/openbeats.png"
          alt="Open Beats Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold-roboto text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <a href="#" onClick={() => history.push("/register")} className="font-medium-roboto text-green1 hover:text-green2">
            create a new account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium-roboto text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>


            <div className="text-sm">
              <a href="#" className="font-medium text-green1 hover:text-green2">
                Forgot your password?
              </a>
            </div>

            <div>
              <button
                onClick={() => {
                  history.push('/dashboard')
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium-roboto text-white bg-green2 hover:bg-green1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <img src="/loginIcons/google.svg" className="w-7" alt="Google icon" />

                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Apple Music</span>
                  <img src="/loginIcons/apple.svg" className="w-7" alt="Apple Music icon" />

                </a>
              </div>

              <div>
                <a
                  href="#"
                  className="w-full inline-flex justify-center py-1 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Spotify</span>

                  <img src="/loginIcons/spotify.png" className="w-7" alt="Spotify icon" />


                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
};

export default Login;
