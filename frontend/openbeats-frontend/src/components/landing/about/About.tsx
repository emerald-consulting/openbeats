/* This example requires Tailwind CSS v2.0+ */
export default function About() {
    return (
      <div className="relative bg-gray-50 pt-16 overflow-hidden sm:pt-24 lg:pt-32">
        <div className="mx-auto max-w-md px-4 text-center sm:px-6 sm:max-w-3xl lg:px-8 lg:max-w-7xl">
          <div>
            <h2 className="text-base font-semibold tracking-wider text-green3 uppercase">remote</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
              No studio? No problem.
            </p>
            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                Open Beats is a Digital Audio Workstation (DAW) that allows for the synchronoous collaboration of musical projects, regardless of geographic location.
            </p>

            <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
                A musical artist can start a studio session and invite other members to it. From there, they can collaborate on music at the same time.
            </p>
          </div>
          <div bg-green3>
            <img
              className="ring-black ring-opacity-5"
              src="/open-beats-demo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    )
  }