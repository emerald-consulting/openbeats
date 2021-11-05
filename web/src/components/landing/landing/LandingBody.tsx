import React from 'react'

import { useHistory } from 'react-router'

const LandingBody: React.FC = () => {
  const history = useHistory()
  return (
    <div className="mx-auto max-w-7xl w-full pt-8 pb-20 text-center">
      <div className="px-4 sm:px-8">
        <h1 className="text-4xl tracking-tight font-extrabold-roboto text-black sm:text-5xl md:text-6xl">
          <span className="block ">Open Beats</span>{' '}
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
          Open Beats, is a Digital Audio Workstation that allows for the
          synchronous collaboration of musical projects remotely.
        </p>

        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
          In addition to a Digital Audio Workstation, Open Beats comes bundled
          with a social media application that allows artists to find other
          tracks to listen to, and other artists to collaborate with.
        </p>
        <div className="mt-10 sm:flex sm:justify-center ">
          <div className="rounded-md shadow">
            <a
              href="#"
              onClick={() => history.push('/register')}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green2 hover:bg-green1 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#"
              onClick={() => history.push('/about')}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green1 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingBody