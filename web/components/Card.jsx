import { DownloadIcon } from "@heroicons/react/solid";
import axios from "axios";
import Wav from "./Wav";

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
        url: `http://localhost:8000/files/download/${post.id}`,
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
      <ul role="list" className="divide-y divide-gray-200">
        {activityItems.map((activityItem) => (
          <li key={post.id.toString()} className="py-4">
            <div className="flex space-x-3 border-gray-900">
              {/* <img
                className="h-6 w-6 rounded-full"
                src={activityItem.person.imageUrl}
                alt=""
              /> */}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">
                    {/* put name of user here */}
                  </h3>
                  <p className="text-sm text-gray-500">{activityItem.time}</p>
                </div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <Wav props={post.fileId}/>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring--500"
                  onClick={downloadFile}
                >
                  Download
                  <DownloadIcon
                    className="ml-2 -mr-0.5 h-4 w-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}