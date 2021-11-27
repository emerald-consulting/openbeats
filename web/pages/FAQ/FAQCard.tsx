import { ArrowCircleLeftIcon, ArrowCircleDownIcon } from "@heroicons/react/outline";



interface Questions {
    id: number;
    header: string;
    answer: string;
  }
  
  export const FAQCard = (qns: Questions) => (
    <li
      key={qns.id}
      className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
    >
      <div className="flex-1 flex flex-col p-8">
        <h3 className="mt-6 text-gray-900 text-sm font-medium">{qns.header}</h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Answer</dt>
          <dd className="text-gray-500 text-sm">{qns.answer}</dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200"></div>
      </div>
    </li>
  );
  