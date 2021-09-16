import { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';


import { classNames } from '../../utils/tailwind';

/**
 * Nav bar displayed to authenticated users.
 */
const AuthenticatedNav = () => {
  const history = useHistory();
  const location = useLocation();

  const onClickDashboard = () => {
    history.push('/dashboard');
  };

  const onClickExample = () => {
    history.push('/example');
  };

  const navigation: {
    name: string;
    pathname: string,
    onclick: () => void;
  }[] = [
      { 'name': 'Dashboard', 'onclick': onClickDashboard, 'pathname': '/dashboard' },
      { 'name': 'Example', 'onclick': onClickExample, 'pathname': '/example' },
    ];

  const profile: {
    name: string;
    onclick: () => void;
  }[] = [
      { 'name': 'Your Profile', 'onclick': () => { } },
      { 'name': 'Settings', 'onclick': () => { } },
      { 'name': 'Sign out', 'onclick': () => { history.push("/")} },
    ];

  return (
    <Disclosure as="nav" className="bg-white shadow py-1">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none">
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-20 w-auto"
                    src="/openbeats.png"
                    alt="openbeats logo"
                    onClick={() => {}}
                    
                  />
                  <img
                    className="hidden lg:block h-20 w-auto"
                    src="/openbeats.png"
                    alt="openbeats logo"
                    onClick={() => {}}
                  />
                </div>
                <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none">

                      <div
                        className="h-12 w-12 rounded-full bg-cover bg-no-repeat bg-profilePic"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {profile.map(item => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              onClick={item.onclick}
                              className={classNames(
                                active ? 'bg-gray-100 cursor-pointer' : '',
                                'block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-4 space-y-1">
              {
                navigation.map(item => (
                  <a
                    onClick={item.onclick}
                    className={
                      item.pathname == location.pathname ? 'cursor-pointer border-green1 text-green1 block pl-3 pr-4 py-2 border-l-4 text-base font-medium' : 'cursor-pointer border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                    }
                  >
                    {item.name}
                  </a>
                ))
              }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}


export default AuthenticatedNav;
