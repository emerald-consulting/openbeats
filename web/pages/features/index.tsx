/* This example requires Tailwind CSS v2.0+ */
import {
  AcademicCapIcon,
  AdjustmentsIcon,
  CloudUploadIcon,
  CogIcon,
  LockClosedIcon,
  RefreshIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "@heroicons/react/outline";
import Footer from "../footer/footer";

const features = [
  {
    name: "Push To Cloud",
    icon: CloudUploadIcon,
    msg: "Don't worry about data storage, put your songs in the cloud!",
  },
  {
    name: "Collaborate",
    icon: LockClosedIcon,
    msg: "Collaborate with others using Open Beats from anywhere",
  },
  {
    name: "Mixing and Mastering",
    icon: AdjustmentsIcon,
    msg: "Unparalleled ability to mix and master your product. Create studio-like quality projects all from the browser.",
  },
  {
    name: "Student Discounts",
    icon: AcademicCapIcon,
    msg: "Receive a 20% student discount when you sign up with a valid .edu email.",
  },
  {
    name: "Powerful API",
    icon: CogIcon,
    msg: "Open API endpoints that you can integrate into you application.",
  },
  {
    name: "Database Backups",
    icon: ServerIcon,
    msg: "Never worry about losing your songs again.",
  },
];

export default function Example() {
  return (
    <div className="bg-emerald-900">
      <div className="relative bg-emerald-900 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
          <h2 className="text-base font-semibold tracking-wider text-green-400 uppercase ">
            Deploy faster
          </h2>
          <p className="mt-2 text-3xl font-extrabold text-green-400 tracking-tight sm:text-4xl">
            Everything you need to create your song
          </p>
          <p className="mt-5 max-w-prose mx-auto text-xl text-white ">
            Here are some of the things that Open Beats can do for you
          </p>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-green-400 rounded-md shadow-lg">
                          <feature.icon
                            className="h-6 w-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                        {feature.name}
                      </h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.msg}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
