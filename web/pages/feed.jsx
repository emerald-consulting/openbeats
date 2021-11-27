/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  MenuIcon,
  XIcon,
} from '@heroicons/react/outline'
import axios from 'axios'
<<<<<<< HEAD:web/pages/feed.jsx
import Card from '../components/Card';
=======
import Card from './Card'
import TextArea from "./TextArea";
>>>>>>> sprint4-focacci-107-fix:web/pages/feed/index.tsx

const baseURL = 'http://localhost:8000/posts/';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

<<<<<<< HEAD:web/pages/feed.jsx
export default function Feed() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [posts, setPosts] = useState([])
=======
export interface IPosts {
  id: Number;
  title: string;
  description?: string;
  fileId?: Number;
}

export default function Feed() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [posts, setPosts] = useState<Array<IPosts>>([])
  const [isTextAreaShown, setTextAreaShown] = useState(false);

  const handleTextArea=(e: any)=>{
    e.preventDefault();

    setTextAreaShown(true); // Here we change state
  }

>>>>>>> sprint4-focacci-107-fix:web/pages/feed/index.tsx

  useEffect(() => {
    axios.get(`${baseURL}`)
    .then(r => setPosts([...r.data]))
  }, [])

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full bg-emerald-700">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex-shrink-0 flex items-center px-4">
                    <a href="../">
                      <img
                        className="h-8 w-auto"
                        src="/openbeats-teal.png"
                        alt="Open Beats"
                      />
                    </a>
                  </div>
                </div>
                <div className="flex-shrink-0 flex border-t border-emerald-800 p-4">
                  <a href="#" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
<<<<<<< HEAD:web/pages/feed.jsx
                        <p className="text-base font-medium text-white">
                          Tom Cook
                        </p>
                        <p className="text-sm font-medium text-indigo-200 group-hover:text-white">
                          View profile
                        </p>
=======
                        <p className="text-base font-medium text-white">Tom Cook</p>
                        <p className="text-sm font-medium text-emerald-200 group-hover:text-white">View profile</p>
>>>>>>> sprint4-focacci-107-fix:web/pages/feed/index.tsx
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
<<<<<<< HEAD:web/pages/feed.jsx
=======
                <h1 className="text-2xl font-semibold text-gray-900">Feed</h1>
                <br/>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                  onClick={handleTextArea}
                >
                  New Post
                </button>
                <br/>
                {isTextAreaShown && <TextArea/>}
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
>>>>>>> sprint4-focacci-107-fix:web/pages/feed/index.tsx
                {/* Replace with your content */}
                <div className="py-4">
                   {posts.map((post) => (
                    <Card key={post.id.toString()} {...post}/>
                  ))} 
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
