/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  FolderIcon,
  HomeIcon,
  MenuIcon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import Groups from "../components/Groups";

export default function Example() {
  return (
    <>
      <div>
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Groups</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* Replace with your content */}
                <div className="py-4">
                  <Groups />
                </div>
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
    </>
  );
}
