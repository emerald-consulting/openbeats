import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/react/solid'
import axios from 'axios'
import { useRouter } from "next/router";

const baseURL = 'http://localhost:8000/posts/create';


const assignees = [
  { name: 'Unassigned', value: null },
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]

export default function TextArea() {
  const[title, setTitle] = useState('')
  const[description, setDescription] = useState('')
  const [file, setFile] = useState(null)

  const router = useRouter();

  const onTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios.post(baseURL, { title: title, description: description })
      .then(function (response) {
        // handle success
        console.log(response);
        router.push('/feed');
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  // const onFileChange = (event: any) => {
  //   setFile(event.target.value);
  // };

  const onSetFile = (e: any) => {
    const fileUploadForm = new FormData();
    fileUploadForm.append('file', e.target.value);
    axios.post("http://localhost:8000/files/upload", fileUploadForm, {
      headers: {
        contentType: 'multipart/form-data'
      }
    })
    .then(function (response) {
      setFile(response.data);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  return (
    <form action="#" className="relative">
      <br/>
      <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
          placeholder="Title"
          onChange={onTitleChange}
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          rows={2}
          name="description"
          id="description"
          className="block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="Write a description..."
          defaultValue={''}
          onChange={onDescriptionChange}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-px">
        <div className="border-t border-gray-200 px-2 py-2 flex justify-between items-center space-x-3 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="-ml-2 -my-2 rounded-full px-3 py-2 inline-flex items-center text-left text-gray-400 group"
            >
              <PaperClipIcon className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500" aria-hidden="true" />
              <input type='file' name='file' onChange={onSetFile} />
            </button>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              onClick={onSubmit}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
