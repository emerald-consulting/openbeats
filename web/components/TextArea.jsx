import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import {
  CalendarIcon,
  PaperClipIcon,
  TagIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import axios from "axios";
import { useRouter } from "next/router";

import { BASE_URL } from '../env'

export default function TextArea(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [fileId, setFileId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const onGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const onTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onSetFileUrl = async (e) => {
    const fileUploadForm = new FormData();
    fileUploadForm.append("file", e.target.files[0]);
    setUploading(true);

    axios
      .post(BASE_URL + "files/upload", fileUploadForm, {})
      .then(function (response) {
        console.log(response.data);
        setFileId(response.data.id);
      })
      .catch(function (err) {
        console.log(err);
      })
      .finally(() => setUploading(false));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const postForm = {
      title: title,
      description: description,
      genre: genre,
      fileId: fileId,
    };
    await axios
      .post(BASE_URL + 'posts/create', postForm)
      .then(function (response) {
        // handle success
        console.log(response);
        props.afterSubmit(e, response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const RenderCreate = () => {
    if (!uploading)
      return (
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Create
        </button>
      );
    else
      return (
        <button
          disabled={true}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-400"
        >
          Create
        </button>
      );
  };

  return (
    <form onSubmit={onSubmit} className="relative">
      <br />
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
          defaultValue={""}
          onChange={onDescriptionChange}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />

          <label htmlFor="genre" className="sr-only">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            className="block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0"
            placeholder="Genre"
            onChange={onGenreChange}
          />

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
              <PaperClipIcon
                className="-ml-1 h-5 w-5 mr-2 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <input type="file" name="file" onChange={onSetFileUrl} />
            </button>
          </div>
          <div className="flex-shrink-0">
            <RenderCreate />
          </div>
        </div>
      </div>
    </form>
  );
}
