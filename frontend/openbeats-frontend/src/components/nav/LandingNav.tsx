

import { Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router';
import { Popover, Transition } from '@headlessui/react'
import {
    MenuIcon,
    XIcon,
} from '@heroicons/react/outline'



/**
 * Nav bar on the landing page for unauthenticated users.
 */
export default function LandingNav() {

    const location = useLocation();
    const history = useHistory();

    const navigation: {
        name: string;
        pathname: string,
        onclick: () => void;
    }[] = [
            { 'name': 'About', 'onclick': () => history.push("/about"), 'pathname': '/about' },
            { 'name': 'Pricing', 'onclick': () => history.push("/pricing"), 'pathname': '/pricing' },
            { 'name': 'Community', 'onclick': () => { }, 'pathname': '/community' },
            { 'name': 'Support', 'onclick': () => { }, 'pathname': '/support' },


        ];

    const onClickLogin = () => {
        history.push('/login');
    }

    const onClickRegister = () => {
        history.push('/register');
    }

    return (
        <Popover className="relative bg-white">
            <div className="flex items-center px-3 justify-between py-3 ">
                <a href="#" className="self-center">
                    <img
                        className="h-16 w-auto"
                        src="openbeats.png"
                        alt="openbeats logo"
                        onClick={() => history.push("/")}

                    />
                </a>


                <div className="-mr-2 -my-2 md:hidden">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                        <span className="sr-only">Open menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                </div>
                <div className="hidden md:flex-1 md:flex md:items-baseline md:justify-between">
                    <div className="cursor-pointer text-2xl hidden lg:block text-gray-700 pr-6" onClick={() => history.push("/")}>
                        Open Beats
                    </div>
                    {
                        navigation.map(item => (
                            <a
                                onClick={item.onclick}
                                className={
                                    item.pathname == location.pathname ? 'cursor-pointer text-base font-medium text-green1 px-5' : 'cursor-pointer xl:text-base font-medium text-gray-500 px-5 hover:text-green1'
                                }
                            >
                                {item.name}
                            </a>
                        ))
                    }



                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <a onClick={onClickLogin} href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-green1">
                            Sign in
                        </a>
                        <a
                            onClick={onClickRegister}
                            href="#"
                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green2 hover:bg-green1"
                        >
                            Register
                        </a>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <a href="#" className="flex">
                                        <img
                                            className="h-16 w-auto"
                                            src="openbeats.png"
                                            alt="openbeats logo"
                                            onClick={() => { history.push("/"); console.log("CLICKED") }}

                                        />
                                    </a>
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>

                        </div>
                        <div className=" px-5">
                            <div className="grid grid-cols-2 gap-4 pb-5">
                                {
                                    navigation.map(item => (
                                        <a
                                            onClick={item.onclick}
                                            className={
                                                item.pathname == location.pathname ? 'cursor-pointer text-base font-medium text-green1 hover:text-gray-900' : 'cursor-pointer xl:text-base font-medium text-gray-500 hover:text-gray-900'
                                            }
                                        >
                                            {item.name}
                                        </a>
                                    ))
                                }

                            </div>
                            <div className="py-6 px-5 space-y-6">

                                <div>
                                    <a
                                        onClick={onClickLogin}
                                        className="cursor-pointer w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green2 hover:bg-green1 border-green"
                                    >
                                        Sign in
                                    </a>
                                    <a
                                        onClick={onClickRegister}
                                        className="cursor-pointer w-full mt-5 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:border-green1 border-green2 border-1"
                                    >
                                        Register
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}

