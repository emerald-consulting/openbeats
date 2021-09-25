/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { classNames } from '../../utils/tailwind'
import { PlusSmIcon } from '@heroicons/react/solid'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

export default function Example() {

  const history = useHistory();
  const location = useLocation();

  const onClickFeed = () => {
    history.push('/feed');
  };

  const onClickExample = () => {
    history.push('/example');
  };
  const navigation: {
    name: string;
    pathname: string,
    onclick: () => void;
  }[] = [
      { 'name': 'Feed', 'onclick': onClickFeed, 'pathname': '/feed' },
      { 'name': 'Example', 'onclick': onClickExample, 'pathname': '/example' },
    ];

  const profile: {
    name: string;
    onclick: () => void;
  }[] = [
      { 'name': 'Your Profile', 'onclick': () => { history.push("/settings") } },
      { 'name': 'Settings', 'onclick': () => { history.push("/settings") } },
      { 'name': 'Sign out', 'onclick': () => { history.push("/") } },
    ];
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="cursor-pointer block lg:hidden h-16 w-auto"
                    src="/openbeats.png"
                    alt="openbeats logo"
                    onClick={() => history.push("/feed")}

                  />
                  <img
                    className="cursor-pointer hidden lg:block h-16 w-auto"
                    src="/openbeats.png"
                    alt="openbeats logo"
                    onClick={() => history.push("/feed")}
                  />
                </div>
                <div className="hidden lg:ml-6 lg:flex lg:space-x-8">
                  {
                    navigation.map(item => (
                      <a
                        onClick={item.onclick}
                        className={
                          item.pathname == location.pathname ? 'cursor-pointer border-green2 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' : 'cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                        }
                      >
                        {item.name}
                      </a>
                    ))
                  }


                </div>
              </div>
              <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
                <div className="max-w-lg w-full lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green3 focus:border-green3 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
                <div className="pl-5 flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green2 shadow-sm hover:bg-green1"
                  >
                    <PlusSmIcon className="-ml-1 mr-2 h- w-5" aria-hidden="true" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 ">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 "
                >
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm">
                      <img
                        className="h-12 w-12 rounded-full object-cover "
                        src={"/exampleProfilePic.jpg"}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white z-50">

                      {
                        profile.map(item => (

                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={item.onclick}

                                className={classNames(active ? 'cursor-pointer bg-gray-100' : '', 'cursor-pointer block px-4 py-2 text-sm text-gray-700')}

                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>

                        ))
                      }

                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}

              {
                navigation.map(item => (
                  <a
                    onClick={item.onclick}
                    className={
                      item.pathname == location.pathname ? 'cursor-pointer border-green1 text-green2 block pl-3 pr-4 py-2 border-l-4 text-base font-medium' : 'cursor-pointer border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    }
                  >
                    {item.name}
                  </a>
                ))
              }

            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full object-cover "
                    src={"/exampleProfilePic.jpg"}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Tim Dillon</div>
                  <div className="text-sm font-medium text-gray-500">tim@example.com</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">

                {
                  profile.map(item => (
                    <a
                      onClick={item.onclick}
                      className={
                        'cursor-pointer block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                      }
                    >
                      {item.name}
                    </a>
                  ))
                }

              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
