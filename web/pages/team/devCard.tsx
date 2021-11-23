import { MailIcon, PhoneIcon } from "@heroicons/react/outline";

interface Dev {
  id: number;
  name: string;
  title: string;
  email: string;
  imageUrl: string;
}

export const DevCard = (dev: Dev) => (
  <li
    key={dev.id}
    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
  >
    <div className="flex-1 flex flex-col p-8">
      <img
        className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
        src={dev.imageUrl}
        alt=""
      />
      <h3 className="mt-6 text-gray-900 text-sm font-medium">{dev.name}</h3>
      <dl className="mt-1 flex-grow flex flex-col justify-between">
        <dt className="sr-only">Title</dt>
        <dd className="text-gray-500 text-sm">{dev.title}</dd>
      </dl>
    </div>
    <div>
      <div className="-mt-px flex divide-x divide-gray-200"></div>
    </div>
    <div>
      <div className="-mt-px flex divide-x divide-gray-200">
        <div className="w-0 flex-1 flex">
          <a
            href={`mailto:${dev.email}`}
            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
          >
            <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            <span className="ml-3">Email</span>
          </a>
        </div>
      </div>
    </div>
  </li>
);
