/* This example requires Tailwind CSS v2.0+ */
import { CloudUploadIcon } from '@heroicons/react/outline';
import axios from 'axios'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
const baseURL = 'http://localhost:8000';

export default function Projects() {
  const router = useRouter();

  const [uploadFile, setUploadFile] = useState('');
  
  const submitForm = (event: any) => {
    event.preventDefault();

    const dataArray = new FormData();
    dataArray.append("uploadFile", uploadFile);

    axios
      .post("http://localhost:8000/files/upload", dataArray, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => {
        // successfully uploaded response
        console.log(response)
      })
      .catch((error) => {
        // error response
        console.warn(error)
      });
  };

  return (
    <div className="text-center">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-medium text-gray-900">No projects</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new project.
      </p>
      <div className="mt-6">
        <input type="file" name="file" onChange={(e) => setUploadFile(e.target.value)}/>
        <button
          onClick={submitForm}
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <CloudUploadIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Upload project
        </button>
      </div>
    </div>
  )
}
