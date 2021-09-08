/**
 * Nav bar on the landing page for unauthenticated users.
 */

/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { Popover, Transition } from '@headlessui/react'
import {
    BookmarkAltIcon,
    CalendarIcon,
    ChartBarIcon,
    CursorClickIcon,
    MenuIcon,
    PhoneIcon,
    PlayIcon,
    RefreshIcon,
    ShieldCheckIcon,
    SupportIcon,
    ViewGridIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'


const features = [


    { name: 'Security', href: '#', description: "some placeholder text", icon: ShieldCheckIcon },
    {
        name: 'Integrations',
        href: '#',
        description: "Connect with third-party tools that you're already using.",
        icon: ViewGridIcon,
    },

]
const callsToAction = [
    { name: 'Watch Demo', href: '#', icon: PlayIcon },
]
const resources: any = [
]
const recentPosts = [
    { id: 1, name: 'Boost your conversion rate', href: '#' },
    { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
    { id: 3, name: 'Improve your customer experience', href: '#' },
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export default function LandingNav() {

    const history = useHistory();

    const onClickLogin = () => {
        history.push('/login');
    }

    const onClickSignUp = () => {
        history.push('/register');
    }

    return (
        <div className="relative bg-gray-50">
            <Popover className="relative bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center md:justify-start md:space-x-10">
                        <div className="flex justify-start lg:w-0 lg:flex-1">
                            <a href="#">
                                <span className="sr-only">Workflow</span>
                                <img
                                    className="sm:h-20 h-16 w-auto" // https://tailwindcss.com/docs/height
                                    src="/openbeats.png"
                                    alt="Open Beats Logo"
                                />
                            </a>
                        </div>
                        <div className="-mr-2 -my-2 md:hidden">
                            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                <span className="sr-only">Open menu</span>
                                <MenuIcon className="h-6 w-6" aria-hidden="true" />
                            </Popover.Button>
                        </div>
                        <Popover.Group as="nav" className="hidden md:flex space-x-10">
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={classNames(
                                                open ? 'text-gray-900' : 'text-gray-500',
                                                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                            )}
                                        >
                                            <span>Solutions</span>
                                            <ChevronDownIcon
                                                className={classNames(
                                                    open ? 'text-gray-600' : 'text-gray-400',
                                                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute -ml-4 mt-3 transform z-10 px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                        {features.map((item) => (
                                                            <a
                                                                key={item.name}
                                                                href={item.href}
                                                                className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                            >
                                                                <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                                <div className="ml-4">
                                                                    <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                    <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                                        {callsToAction.map((item) => (
                                                            <div key={item.name} className="flow-root">
                                                                <a
                                                                    href={item.href}
                                                                    className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
                                                                >
                                                                    <item.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                                                    <span className="ml-3">{item.name}</span>
                                                                </a>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>


                            <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                Docs
                            </a>


                        </Popover.Group>
                        <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                            <a onClick={onClickLogin} href="#" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                                Sign in
                            </a>
                            <a
                                onClick={onClickSignUp}
                                href="#"
                                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green1 hover:bg-green4"
                            >
                                Sign up
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
                    <Popover.Panel
                        focus
                        className="absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden"
                    >
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                            <div className="pt-5 pb-6 px-5">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <img
                                            className="sm:h-20 h-16 w-auto" // https://tailwindcss.com/docs/height
                                            src="/openbeats.png"
                                            alt="Open Beats Logo"
                                        />
                                    </div>
                                    <div className="-mr-2">
                                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                            <span className="sr-only">Close menu</span>
                                            <XIcon className="h-6 w-6" aria-hidden="true" />
                                        </Popover.Button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-8">
                                        {features.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                            >
                                                <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>
                            </div>
                            <div className="py-6 px-5 space-y-6">

                                <div>
                                    <a
                                        onClick={onClickSignUp}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Sign up
                                    </a>
                                    <a
                                        onClick={onClickSignUp}
                                        className="w-full mt-5 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:bg-indigo-700"
                                    >
                                        Sign in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </div>
    )
}
