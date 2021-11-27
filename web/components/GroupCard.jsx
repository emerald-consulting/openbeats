export const GroupCard = (group) => (
  <li
    key={group.id}
    className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
  >
    <div className="flex-1 flex flex-col p-8">
      <img
        className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
        src={group.imageUrl}
        alt=""
      />
      <h3 className="mt-6 text-gray-900 text-sm font-medium">{group.name}</h3>
      <dl className="mt-1 flex-grow flex flex-col justify-between">
        <dt className="sr-only">Title</dt>
        <dd className="text-gray-500 text-sm">{group.title}</dd>
        <dt className="sr-only">Role</dt>
        <dd className="mt-3">
          <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
            {group.role}
          </span>
        </dd>
      </dl>
    </div>
    <div>
      <div className="-mt-px flex divide-x divide-gray-200"></div>
    </div>
  </li>
);
