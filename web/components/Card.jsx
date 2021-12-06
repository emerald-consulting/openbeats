import { DownloadIcon } from "@heroicons/react/solid";
import axios from "axios";
import Wav from "./Wav";

import { BASE_URL } from "../env";

// const people = [
//   {
//     name: "Ryan Dils",
//     imageUrl:
//       "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80",
//   },
//   // More people...
// ];
const activityItems = [
  {
    id: 1,
    song: "Title of Song",
    artist: "Name of Artist",
    time: "1h",
  },
];

export default function Card(post) {
  const downloadFile = () => {
    if (post.id) {
      axios({
        url: BASE_URL + "files/download/" + post.fileId,
        method: "GET",
        responseType: "blob", // important
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${post.title}.wav`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    }
  };

  return (
    <div className="border-t-2 border-gray-300 rounded-b-lg pt-10 pb-8 px-6 bg-green-50 sm:px-10 sm:py-10">
      {activityItems.map((activityItem) => (
        <div
          key={post.id.toString()}
          className="flex space-x-3 border-gray-900"
        >
          <div className="flex-1 space-y-1">
            <p className="h3">{post.title}</p>
            <p className="h5 mb-2">{post.genre}</p>
            <p><i>{post.description}</i></p>
            {post.fileId && (
              <div>
                <Wav props={{ ...post }} />
                <br />
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500"
                  onClick={downloadFile}
                >
                  Download
                  <DownloadIcon
                    className="ml-2 -mr-0.5 h-4 w-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
